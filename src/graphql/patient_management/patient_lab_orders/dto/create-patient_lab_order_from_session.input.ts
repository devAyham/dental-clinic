import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePatientLabOrderFromSessionInput {

  // @Field(() => Int, { nullable: true })
  // patient_session_id?: number;
  
  @Field(() => Int)
  lab_order_id: number;

  @Field(() => Int)
  patient_id: number;


  @Field(() => String)
  type: string;

  @Field(() => String)
  degree: string;

  @Field(() => String)
  directions: string;

  @Field(() => Date)
  created_at: Date;
  
  @Field(() => Date)
  deliver_at: Date;
  
  
  @Field(() => [String])
  notation: string[];
}
