import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./user-entity";
import { IsNotEmpty, IsString } from 'class-validator'
import { Patient } from "src/graphql/patient_management/patient/entities/patient.entity";

@ObjectType()
export class CreateUserPatient {

    @Field(() => User)
    user: User;

    @Field(() => Patient)
    patient: Patient;

}

