import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePatientPerscrptionsMedicienInput {

  @Field(() => Int)
  patient_perscrption_id: number;

  @Field(() => Int)
  medicince_id: number;

  @Field(() => String)
  qantity: string;

  @Field(() => String)
  repetition: string;

  @Field(() => String, { nullable: true })
  description?: string;

}
