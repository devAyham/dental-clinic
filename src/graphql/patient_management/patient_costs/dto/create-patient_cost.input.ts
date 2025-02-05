import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreatePatientCostInput {
  @Field(() => Float)
  amount: number;

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Date)
  date: Date

  @Field(() => Int)
  patient_id: number

  @Field(() => Int, { nullable: true })
  treatment_id?: number
}
