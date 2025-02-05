import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Problem } from 'src/graphql/problem/entities/problem.entity';

@ObjectType()
export class PatientDiagnosis {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  place: string;

  @Field(() => String, { nullable: true })
  expected_treatment?: string;

  @Field(() => Int)
  patient_id: number

  @Field(() => Int)
  problem_id: number

  @Field(() => Problem)
  problem: Problem
}
