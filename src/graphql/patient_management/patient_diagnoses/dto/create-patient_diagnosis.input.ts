import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePatientDiagnosisInput {
  @Field(() => String)
  place: string;

  @Field(() => String, { nullable: true })
  expected_treatment?: string;

  @Field(() => Int)
  patient_id: number

  @Field(() => Int)
  problem_id: number

}
