import { CreateStoredProductInput } from './create-stored_product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStoredProductInput extends PartialType(CreateStoredProductInput) {
  @Field(() => Int)
  product_id: number;

  @Field(() => Date)
  expiration_date?: Date

  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  total_quantity: number;
}
