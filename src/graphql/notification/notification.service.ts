import { Injectable } from '@nestjs/common';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client';
import { OtpService } from 'src/auth/otp.service';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private readonly otpService: OtpService,
  ) {}

  async create({ patient_id, ...rest }: CreateNotificationInput) {
    const pivot = await this.prisma.patientUser.findFirst({
      where: {
        patient_id,
      },
    });
    if (pivot) {
      const notification = await this.prisma.notifications.create({
        data: {
          ...rest,
          user_id: pivot.user_id,
        },
        include: {
          user: true,
        },
      });

      this.otpService.sendSMSVerifyCode({
        phone_number: notification.user.phone,
        template: rest.msg,
      });
      return true;
    }
    return false;
  }

  async findAll(
    page: any,
    item_per_page: any,
    search?: string,
    user_id?: number,
  ) {
    return await PaginatorService<Prisma.notificationsFindManyArgs>({
      Modal: this.prisma.notifications,
      item_per_page,
      page,
      search,
      relations: {
        where: {
          user_id,
        },
      },
    });
  }

  async readAll(user_id: number) {
    await this.prisma.notifications.updateMany({
      data: {
        seen: true,
      },
      where: {
        user_id,
      },
    });
    return true;
  }

  async read(notification_id: number) {
    await this.prisma.notifications.update({
      data: {
        seen: true,
      },
      where: {
        id: notification_id,
      },
    });
    return true;
  }
}
