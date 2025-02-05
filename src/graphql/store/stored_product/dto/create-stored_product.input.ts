import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStoredProductInput {
  @Field(() => Int)
  product_id: number;

  @Field(() => Date)
  expiration_date: Date

  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  total_quantity: number;
}
