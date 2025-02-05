import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GetProducts {
  @Field(() => Int)
  product_id: number;

  @Field()
  name: string;

  @Field(() => Int)
  totalQuantity: number;
}
