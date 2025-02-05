import { CreatePatientPerscrptionInput } from './create-patient_perscrption.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientPerscrptionInput extends PartialType(CreatePatientPerscrptionInput) {
  @Field(() => Int)
  id: number;
}
