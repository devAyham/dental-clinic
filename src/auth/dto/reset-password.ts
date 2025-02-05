import { InputType, Field } from '@nestjs/graphql';
import {  IsNotEmpty, IsString, Length } from 'class-validator'

@InputType()
export class ResetPasswordInput {

  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  @Field()
  password: string

  
  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  @Field()
  c_password: string

  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  @Field()
  otp: string

  @IsNotEmpty()
  @IsString()
  @Field()
  phone: string
}
