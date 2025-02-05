import { Field, InputType, Int } from "@nestjs/graphql";
import { CreatePatientBadHabitInput } from "./create-patient_bad-habit.input";

@InputType()
export class CreatePatientBadHabitForExistingPatientInput extends CreatePatientBadHabitInput {
    @Field(() => Int)
    patient_id: number

}