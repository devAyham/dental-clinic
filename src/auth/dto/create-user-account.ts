
import { InputType, Field } from '@nestjs/graphql';
import {  IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateUserAccountInput {

    @IsNotEmpty()
    @IsString()
    @Field()
    phone: string

    @Field()
    password: string

    @Field()
    c_password: string

    @Field()
    otp: string

}
