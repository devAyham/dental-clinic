import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../../product/entities/product.entity';

@ObjectType()
export class StoredProduct {
  @Field(() => Int)
  id: number;

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

  @Field(() => Product)
  product: Product;
}
