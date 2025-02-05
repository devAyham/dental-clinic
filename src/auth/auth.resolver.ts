import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './entities/auth.response';
import { LogoutResponse } from './dto/logout-response';
import { Public } from './decorators/public.decorators';
import { CurrentUserId } from './decorators/currentUserId.decorator';
import { CurrentUser } from './decorators/currentUser.decorator';
import { PhoneInput } from './dto/phone-input';
import { CheckPhoneResponse } from './entities/check-phone.response';
import { SendOtpResponse } from './entities/send-otp.response';
import { CreateUserAccountInput } from './dto/create-user-account';
import { LoginInput } from './dto/login-input';
import { CreateUserPatientInput } from './dto/create-patient';
import { CreateUserPatientResponse } from './entities/create-user-patient.response';
import { CreateUserAccountResponse } from './entities/create-user-account.response';
import { ChangePasswordResponse } from './entities/change-password.response';
import { ResetPasswordInput } from './dto/reset-password';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => CheckPhoneResponse, { name: 'CheckPhone' })
  checkPhone(@Args('checkPhoneInput') checkPhoneInput: PhoneInput) {
    return this.authService.checkPhone(checkPhoneInput);
  }

  @Public()
  @Mutation(() => SendOtpResponse, { name: 'SendOtp' })
  sendOtp(@Args('checkPhoneInput') checkPhoneInput: PhoneInput) {
    return this.authService.sendOtp(checkPhoneInput);
  }

  @Public()
  @Mutation(() => CreateUserAccountResponse, { name: 'createUserAccount' })
  createUserAccount(
    @Args('createUserAccountInput')
    createUserAccountInput: CreateUserAccountInput,
  ) {
    return this.authService.createUserAccount(createUserAccountInput);
  }

  @Mutation(() => CreateUserPatientResponse, { name: 'createPatientToUser' })
  createPatientToUser(
    @Args('CreatePatientInput') CreatePatientInput: CreateUserPatientInput,
    @CurrentUser() user,
  ) {
    return this.authService.createPatientToUser(CreatePatientInput, user);
  }

  @Mutation(() => CreateUserPatientResponse, { name: 'linkPatientToUser' })
  linkPatientToUser(@CurrentUser() user) {
    return this.authService.linkPatientToUser(user);
  }

  @Public()
  @Mutation(() => AuthResponse, { name: 'login' })
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Public()
  @Mutation(() => AuthResponse, { name: 'loginDoctor' })
  loginDoctor(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.loginDoctor(loginInput);
  }
  

  @Mutation(() => LogoutResponse)
  async logout(@CurrentUserId() usesId) {
    return this.authService.logout(usesId);
  }

  @Public()
  @Mutation(() => SendOtpResponse, { name: 'resetPassword' })
  resetPassword(@Args('checkPhoneInput') checkPhoneInput: PhoneInput) {
    return this.authService.resetPassword(checkPhoneInput);
  }

  @Public()
  @Mutation(() => ChangePasswordResponse, { name: 'changePassword' })
  changePassword(@Args('changePasswordInput') changePasswordInput: ResetPasswordInput) {
    return this.authService.resetPassword(changePasswordInput);
  }

  

  // @Mutation(() => Auth)
  // reomveUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.removeUser(id);
  // }

  // @Public()
  // @UseGuards(RefreshTokenGuard)
  // @Mutation(() => NewTokenResponse)
  // geNewTokens(
  //   @CurrentUserId() userId: number,
  //   @CurrentUser('refreshToken') refreshToken: string,
  // ) {
  //   return this.authService.getNewTokens(userId, refreshToken);
  // }

  // @Query(() => [Auth], { name: 'auth' })
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Query(() => Auth, { name: 'auth' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.findOne(id);
  // }

  // @Mutation(() => Auth)
  // updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
  //   return this.authService.update(updateAuthInput.id, updateAuthInput);
  // }
}
