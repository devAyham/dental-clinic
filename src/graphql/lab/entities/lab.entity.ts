import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Lab {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  address: string;
}
