import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'src/pagination/PaginateResult';
import { Notification } from './notification.entity';

@ObjectType()
export class PaginateNotification extends PaginateResult(Notification) {}