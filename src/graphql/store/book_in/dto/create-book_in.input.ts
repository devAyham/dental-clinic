import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateDateColumn } from 'typeorm';

@InputType()
export class CreateBookInInput {
  @Field(() => Int)
  product_id: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  price: number;

  @Field(() =>Date ,{nullable :true} )
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date  


  @Field(() => Date)
  expiration_date: Date
}
