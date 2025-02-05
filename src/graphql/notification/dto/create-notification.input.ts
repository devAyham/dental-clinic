import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field(() => Int)
  patient_id: number;

  @Field(() => String )
  msg: string;

  @Field(() => String )
  title: string;


}