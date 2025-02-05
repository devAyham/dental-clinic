import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { PaginateNotification } from './entities/paginate-notification';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => Boolean)
  createNotification(
    @Args('createNotificationInput')
    createNotificationInput: CreateNotificationInput,
  ) {
    return this.notificationService.create(createNotificationInput);
  }

  @Query(() => PaginateNotification, { name: 'notifications' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('search', { nullable: true }) search?: string,
    @Args('item_per_page', { nullable: true }) item_per_page?: number,
    @Args('user_id', { nullable: true }) user_id?: number,
  ) {
    const notifications = await this.notificationService.findAll(
      page,
      item_per_page,
      search,
      user_id,
    );
    return {
      items: notifications.data,
      totalPages: notifications.totalPages,
      page: notifications.page,
      item_per_page: notifications.item_per_page,
    };
  }

  @Mutation(() => Boolean,{name:"readMyNotifications"})
  readAll(@Args('user_id') user_id: number) {
    return this.notificationService.readAll(user_id);
  }

  @Mutation(() => Boolean,{name:"readNotification"})
  read(@Args('notification_id') notification_id: number) {
    return this.notificationService.read(notification_id);
  }


}
