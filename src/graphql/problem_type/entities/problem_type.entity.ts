import { ObjectType, Field, Int, PartialType } from '@nestjs/graphql';

@ObjectType()
export class ProblemType {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field()
  name: string;
}
