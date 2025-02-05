import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => Int, { description: 'id field (placeholder)' })
  id: number;


  @Field(() => String, { description: 'name field (placeholder)' })
  name: string;
}
