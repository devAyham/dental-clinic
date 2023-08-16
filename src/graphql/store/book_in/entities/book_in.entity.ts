import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/graphql/product/entities/product.entity';
import { CreateDateColumn } from 'typeorm';

@ObjectType()
export class BookIn {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  product_id: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  total_price: number;

  @Field(() =>Date )
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date  

  @Field(() => Product)
  product: Product;
}
