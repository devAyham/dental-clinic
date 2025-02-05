import { CreatePatientTeethTreatmentInput } from './create-patient_teeth_treatment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientTeethTreatmentInput extends PartialType(CreatePatientTeethTreatmentInput) {
  @Field(() => Int)
  id: number;
}
