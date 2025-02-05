import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProblemTypeInput {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // id: number;

  @Field(() => String, { description: 'The Name of the problem type' })
  name: string;
}
