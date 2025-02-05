import { InputType, Field } from '@nestjs/graphql';
import {  IsNotEmpty, IsString, Length } from 'class-validator'

@InputType()
export class SignUpInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  userName: string

  @IsNotEmpty()
  @IsString()
  @Field()
  phone: string

  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  @Field()
  password: string


  @IsNotEmpty()
  @IsString()
  @Field()
  patientId: number



}
