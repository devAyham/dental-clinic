import { ObjectType } from '@nestjs/graphql';
import { Response } from 'src/global/response-entity';
import { ChangePassword } from './change-password.entity';


@ObjectType()
export class ChangePasswordResponse extends Response(ChangePassword) {}

