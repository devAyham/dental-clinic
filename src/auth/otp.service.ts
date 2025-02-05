import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { OtpProps } from 'src/graphql/interfaces/props.interface';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';

@Injectable()
export class OtpService {
  constructor(private prisma: PrismaService) {}
  async sendSMSVerifyCode(otpProps: OtpProps): Promise<boolean> {
    try {
      if(otpProps.phone_number.length==9){
        otpProps.phone_number=join("9630",otpProps.phone_number)
      }
      const response = await axios.post(
        'https://rest-ww.telesign.com/v1/verify/sms',
        {
          // ...otpProps,
          phone_number: otpProps.phone_number,
          template: otpProps.template,
          verify_code: otpProps.verify_code,
        },
        {
          headers: {
            accept: 'application/json',
            authorization:
              'Basic RTc4Njg1RDgtRUNGNS00RjZBLTg4MDAtMUQ2QjA2QzBFNUI3OkYvOC93U0V6WmlpSDRjemc0TDRHaHJVRVphbGErU3pPZ1d2T3B0bUp5WjRkRDlKUGp2enhmTGVSZ0VkTi9iZTFwSDdRSmlNN1FkNUx4TE5PUHlEVUpBPT0=',
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      );

      console.log(response.data);
      return true;
    } catch (error) {
      // console.error(error);
      console.error(error.message);

      return false;
    }
  }

  generateOtpCode(length: number = 4): string {
    if (length < 3 || length > 7) {
      throw new GraphQLError(
        'Invalid OTP code length. Length must be between 3 and 7.',
        { extensions: { code: 500 } },
      );
    }
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      otp += digits[randomIndex];
    }

    return otp;
  }

  async sendOtpToUser(phone: string, SEND_REAL_OTP: boolean = false) {
    const otp = this.generateOtpCode();

    await this.prisma.user.upsert({
      where: { phone: phone },
      update: { otp },
      create: {
        phone,
        otp,
      },
    });

    const isSended = SEND_REAL_OTP
      ? await this.sendSMSVerifyCode({
          phone_number: phone,
          verify_code: otp,
          template: 'Your code is $$CODE$$, Thank you',
        })
      : true;

    // if (isSended) {
      return { otp, isSended };
    // }
  }
}
