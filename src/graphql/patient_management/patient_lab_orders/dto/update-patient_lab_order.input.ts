import { CreatePatientLabOrderInput } from './create-patient_lab_order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientLabOrderInput extends PartialType(CreatePatientLabOrderInput) {
  @Field(() => Int)
  id: number;
}
