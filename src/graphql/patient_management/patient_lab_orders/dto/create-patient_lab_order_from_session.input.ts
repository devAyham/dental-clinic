import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePatientLabOrderFromSessionInput {
  @Field(() => Int)
  lab_order_id: number;

  @Field(() => Int)
  patient_id: number;

  // @Field(() => Int, { nullable: true })
  // patient_session_id?: number;

  @Field(() => String)
  type: string;

  @Field(() => String)
  degree: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => String)
  directions: string;

  
  @Field(() => [String])
  notation: string[];
}
