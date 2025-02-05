import { CreatePatientCostInput } from './create-patient_cost.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientCostInput extends PartialType(CreatePatientCostInput) {
  @Field(() => Int)
  id: number;
}
