import { CreatePatientPaymentInput } from './create-patient_payment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientPaymentInput extends PartialType(CreatePatientPaymentInput) {
  @Field(() => Int)
  id: number;
}
