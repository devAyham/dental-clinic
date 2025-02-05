import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./user-entity";
import { IsNotEmpty, IsString } from 'class-validator'
import { Patient } from "src/graphql/patient_management/patient/entities/patient.entity";
import { CheckPhone } from "./check-phone.entity";

@ObjectType()
export class ChangePassword {
    @Field(() => Boolean,{nullable:true})
    bool? :boolean 
}

