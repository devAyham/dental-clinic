import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { OtpService } from 'src/auth/otp.service';

@Module({
  providers: [OtpService,NotificationResolver, NotificationService]
})
export class NotificationModule {}
