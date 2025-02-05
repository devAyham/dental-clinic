import { CreateProblemInput } from './create-problem.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProblemInput extends PartialType(CreateProblemInput) {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  problem_type_id: number;
}
