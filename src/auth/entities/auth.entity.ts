import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./user-entity";
import { IsNotEmpty, IsString } from 'class-validator'
import { Patient } from "src/graphql/patient_management/patient/entities/patient.entity";
import { CheckPhone } from "./check-phone.entity";

@ObjectType()
export class Auth {
    @IsNotEmpty()
    @IsString()
    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;

    @Field(() => User)
    user: User;

    @Field(() => Patient, { nullable: true })
    patient?: Patient;

    @Field(() => CheckPhone, { nullable: true })
    status?: CheckPhone;
}

