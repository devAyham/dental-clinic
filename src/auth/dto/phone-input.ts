import { InputType, Field } from '@nestjs/graphql';
import {  IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class PhoneInput {

    @IsNotEmpty()
    @IsString()
    @Field()
    phone: string


}
