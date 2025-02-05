import { ObjectType } from '@nestjs/graphql';
import { Response } from 'src/global/response-entity';
import { SendOtp } from './send-otp.entity';


@ObjectType()
export class SendOtpResponse extends Response(SendOtp) {}

