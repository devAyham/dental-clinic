import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePatientReservationInput {
  @Field(() => Int)
  patient_id: number;

  @Field(() => Date)
  date: Date;

  @Field(() => String, { nullable: true })
  notes?: string;
}
