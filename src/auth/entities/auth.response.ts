import { ObjectType } from '@nestjs/graphql';
import { Response } from 'src/global/response-entity';
import { Auth } from './auth.entity';


@ObjectType()
export class AuthResponse extends Response(Auth) {}
