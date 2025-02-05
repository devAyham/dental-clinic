import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist';
import * as argon from 'argon2';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { LogoutResponse } from './dto/logout-response';
import { PhoneInput } from './dto/phone-input';
import { OtpService } from './otp.service';
import { CreateUserAccountInput } from './dto/create-user-account';
import { GraphQLError } from 'graphql';
import { CheckPhoneResponse } from './entities/check-phone.response';
import { SendOtpResponse } from './entities/send-otp.response';
import { CreateUserAccountResponse } from './entities/create-user-account.response';
import { LoginInput } from './dto/login-input';
import { CreateUserPatientInput } from './dto/create-patient';
import { PatientService } from 'src/graphql/patient_management/patient/patient.service';
import { ResetPasswordInput } from './dto/reset-password';
import { ChangePasswordResponse } from './entities/change-password.response';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private patientService: PatientService,
    private readonly otpService: OtpService,
  ) { }

  async checkPhone(phoneInput: PhoneInput): Promise<CheckPhoneResponse> {
    const user = await this.prisma.user.findFirst({
      where: { phone: phoneInput.phone },
    });

    const patient = await this.prisma.patient.findFirst({
      where: { phone: phoneInput.phone },
    });

    let status;

    if (user && patient) {
      const checkPivotExist = await this.prisma.patientUser.findFirst({
        where: { user_id: user.id },
      });
      if (checkPivotExist) {
        //  checkPhone -> login
        status = {
          message: 'User account and patient found,[login -> home page] ',
          code: 1,
        };
      } else {
        status = {
          message:
            'User account and patient found, but not linked together , [ login -> linkPatientToUser  -> home page] ',
          code: 2,
        };
      }
    } else if (!user && patient) {
      status = {
        message:
          'Patient found, provide OTP and new password [ sendOtp ->  createUserAccount(get token from it) -> linkPatientToUser  -> home page]',
        code: 3,
      };
    } else if (user && !patient) {
      status = {
        message:
          'User account found, but no patient; create patient , [ login -> createPatientToUser  -> home page ]',
        code: 4,
      };
    } else {
      status = {
        //
        message:
          'User account and patient not found,[  sendOtp -> createUserAccount(get token from it) -> createPatientToUser  -> home page ] ',
        code: 5,
      };
    }

    return {
      data: {
        ...status,
        phoneHaveUserAccount: !!user,
        phoneHavePatient: !!patient,
      },
      message: 'request successfully',
      status: 200,
    };
  }

  // create user account,that is have phone and otp values and other null
  async sendOtp({ phone }: PhoneInput): Promise<SendOtpResponse> {
    const user = await this.prisma.user.findFirst({
      where: { phone },
    });
    if (user?.isVerified) {
      throw new GraphQLError('already this phone verified  ', {
        extensions: { code: 400 },
      });
    }

    const { isSended, otp } = await this.otpService.sendOtpToUser(phone, false);

    return isSended
      ? {
        data: { otp },
        message: `Your code is ${otp}, Thank you`,
        status: 200,
      }
      : {
        data: { otp },
        message: "otp doesn't sended successfully ",
        status: 400,
      };
  }
  //IS_PUBLIC
  // verify user account by otp and store password
  async createUserAccount({
    password,
    phone,
    otp,
  }: CreateUserAccountInput): Promise<CreateUserAccountResponse> {
    if (phone === '0999999999') {
      throw new GraphQLError('this number is used for doctor ', {
        extensions: { code: 400 },
      });
    }

    const user = await this.prisma.user.findFirst({ where: { phone } });

    if (!user) {
      throw new GraphQLError('phone not found ', { extensions: { code: 404 } });
    }

    if (user.isVerified) {
      throw new GraphQLError('this account already created and is verified ', {
        extensions: { code: 400 },
      });
    }

    if (user.otp != otp) {
      throw new GraphQLError('Wrong otp', { extensions: { code: 400 } });
    }

    const hashedPassword = await argon.hash(password);
    const updatedUser = await this.prisma.user.update({
      where: {
        phone,
      },
      data: {
        hashedPassword,
        isVerified: true,
      },
    });
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.phone,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    console.log(updatedUser);

    return {
      data: { accessToken, refreshToken, user: updatedUser },
      message: 'user verified successfully',
      status: 200,
    };
  }

  //AUTH
  // create new patient and link auth user with this new patient info
  async createPatientToUser(createPatientInput: CreateUserPatientInput, user) {
    const checkPatientExists = await this.prisma.patient.findFirst({
      where: { phone: user.phone },
    });
    if (checkPatientExists) {
      throw new GraphQLError('this phone already have patient', {
        extensions: { code: 403 },
      });
    }
    console.log({ ...user });

    const patientData = {
      ...createPatientInput,
      phone: user.phone,
    };
    // console.log(1);

    const patient = await this.patientService.create(patientData);
    const pivot = await this.prisma.patientUser.create({
      data: {
        patient_id: patient.id,
        user_id: user.id,
      },
    });

    return {
      data: { user: { ...user }, patient: { ...patient } },
      message: 'user verified successfully',
      status: 200,
    };
  }

  async linkPatientToUser(user) {
    console.dir(user);
    const checkPivotExist = await this.prisma.patientUser.findFirst({
      where: { user_id: user.id },
    });
    if (checkPivotExist) {
      throw new GraphQLError('this phone already have user account ', {
        extensions: { code: 403 },
      });
    }
    const patient = await this.prisma.patient.findFirst({
      where: {
        phone: user.phone,
      },
    });
    const pivot = await this.prisma.patientUser.create({
      data: {
        patient_id: patient.id,
        user_id: user.id,
      },
    });
    return {
      data: { user: { ...user }, patient: { ...patient } },
      message: 'patient linked with this user account successfully',
      status: 200,
    };
  }

  async login(loginInput: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { phone: loginInput.phone },
    });
    if (!user) {
      throw new GraphQLError('phone not found _', {
        extensions: { code: 404 },
      });
    }
    if (!user?.isVerified) {
      throw new GraphQLError('account has not verified yet', {
        extensions: { code: 403 },
      });
    }
    const hashedRefreshToken = await argon.hash(loginInput.password);
    console.log(hashedRefreshToken);

    const isPasswordMatch = await argon.verify(
      user.hashedPassword,
      loginInput.password,
    );
    if (!isPasswordMatch) {
      throw new GraphQLError('Wrong credentials', {
        extensions: { code: 403 },
      });
    }

    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.phone,
    );
    await this.updateRefreshToken(user.id, refreshToken);

    const patient = await this.prisma.patient.findFirst({
      where: { phone: user.phone },
    });
    let status;
    let suspension = false;
    if (!patient) {
      suspension = true;
      status = {
        message:
          'User account found, but no patient; create patient [createPatientToUser ->home page]',
        code: 4,
      };
    } else {
      suspension = true;
      const checkPivotExist = await this.prisma.patientUser.findFirst({
        where: { user_id: user.id, patient_id: patient.id },
      });
      if (!checkPivotExist) {
        status = {
          message:
            'User account and patient found but not linked together , [linkPatientToUser ->home page]  ',
          code: 2,
        };
      }
    }
    if (suspension) {
      status = {
        message: 'you are welcome go to home page',
        code: 6,
      };
    }

    status = {
      phoneHaveUserAccount: !!user,
      phoneHavePatient: !!patient,
      ...status,
    };

    return {
      data: { accessToken, refreshToken, user, patient, status },
      message: 'login successfully',
      status: 200,
    };
  }

  async loginDoctor(loginInput: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { phone: loginInput.phone },
    });
    if (!user) {
      throw new GraphQLError('phone not found _', {
        extensions: { code: 404 },
      });
    }

    if (user.role_id != 2) {
      throw new GraphQLError('you are not doctor كول خرا', {
        extensions: { code: 403 },
      });
    }

    if (!user?.isVerified) {
      throw new GraphQLError('account has not verified yet', {
        extensions: { code: 403 },
      });
    }
    const hashedRefreshToken = await argon.hash(loginInput.password);

    const isPasswordMatch = await argon.verify(
      user.hashedPassword,
      loginInput.password,
    );
    if (!isPasswordMatch) {
      throw new GraphQLError('Wrong Credential', {
        extensions: { code: 403 },
      });
    }

    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.phone,
    );
    await this.updateRefreshToken(user.id, refreshToken);

    let status = {
      phoneHaveUserAccount: true,
      phoneHavePatient: false,
      message: 'you are welcome go to home page',
      code: 1,
    };

    return {
      data: { accessToken, refreshToken, user, status },
      message: 'login successfully',
      status: 200,
    };
  }

  async logout(userId: number): Promise<LogoutResponse> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: { not: null },
      },
      data: {
        hashedRefreshToken: null,
      },
    });
    return { loggedOut: true };
  }

  async resetPassword({ phone }: PhoneInput) {
    const { isSended, otp } = await this.otpService.sendOtpToUser(phone, false);
    return isSended
      ? {
        data: { otp },
        message: `Your code is ${otp}, Thank you`,
        status: 200,
      }
      : {
        data: { otp },
        message: "otp doesn't sended successfully ",
        status: 400,
      };
  }

  async changePassword({
    password,
    otp,
    phone,
  }: ResetPasswordInput): Promise<ChangePasswordResponse> {
    const user = await this.prisma.user.findFirst({
      where: {
        phone,
      },
    });
    if (!user) {
      throw new GraphQLError('phone not found ', { extensions: { code: 404 } });
    }

    if (user.otp !== otp) {
      throw new GraphQLError('Wrong otp', { extensions: { code: 404 } });
    }
    const hashedPassword = await argon.hash(password);
    await this.prisma.user.update({
      where: { phone },
      data: {
        hashedPassword,
        otp: null,
      },
    });
    return {
      data: {},
      message: 'Password updated successfully ',
      status: 200,
    };
  }

  async removeUser(userId: number) {
    // need to check if the user token is valid
    return await this.prisma.user.delete({ where: { id: userId } });
  }

  async createTokens(userId: number, phone: string) {
    const accessToken = this.jwtService.sign(
      {
        userId,
        phone,
      },
      {
        expiresIn: '1d',
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        userId,
        phone,
        accessToken,
      },
      {
        expiresIn: '7d',
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      },
    );

    return { refreshToken, accessToken };
  }
  async updateRefreshToken(userId: number, refreshToekn: string) {
    const hashedRefreshToken = await argon.hash(refreshToekn);
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        hashedRefreshToken,
      },
    });
  }
  async getNewTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    const isRefreshTokenMatch = await argon.verify(user.hashedRefreshToken, rt);
    if (!isRefreshTokenMatch) {
      throw new ForbiddenException('Access Denied');
    }
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.phone,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }
}
