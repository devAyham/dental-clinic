import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreatePatientDiseaseForExistingPatientInput } from './create-patient_disease-4-existing-patient.input';

@InputType()
export class UpdatePatientDiseaseInput extends PartialType(CreatePatientDiseaseForExistingPatientInput) {
  @Field(() => Int)
  id: number;
}
