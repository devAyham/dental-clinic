import { Field, InputType, Int } from "@nestjs/graphql"
import { CreatePatientMedicineInput } from "./create-patient_medicine.input"

@InputType()
export class CreatePatientMedicineForExistingPatientInput extends CreatePatientMedicineInput {
    @Field(() => Int)
    patient_id: number

}