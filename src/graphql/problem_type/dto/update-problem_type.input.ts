import { CreateProblemTypeInput } from './create-problem_type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProblemTypeInput extends PartialType(
  CreateProblemTypeInput,
) {
  @Field()
  name: string;
}
