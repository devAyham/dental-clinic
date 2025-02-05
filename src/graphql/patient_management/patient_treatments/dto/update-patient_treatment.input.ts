import { CreatePatientTreatmentInput } from './create-patient_treatment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientTreatmentInput extends PartialType(CreatePatientTreatmentInput) {
  @Field(() => Int)
  id: number;
}
