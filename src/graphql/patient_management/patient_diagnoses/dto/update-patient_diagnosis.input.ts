import { CreatePatientDiagnosisInput } from './create-patient_diagnosis.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientDiagnosisInput extends PartialType(CreatePatientDiagnosisInput) {
  @Field(() => Int)
  id: number;
}
