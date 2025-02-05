import { CreatePatientMedicineForExistingPatientInput } from './create-patient_medicine-4-existing-patient.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientMedicineInput extends PartialType(CreatePatientMedicineForExistingPatientInput) {
  @Field(() => Int)
  id: number;
}
