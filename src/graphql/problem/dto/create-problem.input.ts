import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProblemInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  problem_type_id: number;
}
