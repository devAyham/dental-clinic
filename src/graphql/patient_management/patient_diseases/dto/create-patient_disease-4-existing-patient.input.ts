import { InputType, Int, Field } from '@nestjs/graphql';
import { CreatePatientDiseaseInput } from './create-patient-disease.input';


@InputType()
export class CreatePatientDiseaseForExistingPatientInput extends CreatePatientDiseaseInput {
  @Field(() => Int)
  patient_id: number
}

