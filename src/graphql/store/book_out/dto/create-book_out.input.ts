import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateDateColumn } from 'typeorm';

@InputType()
export class CreateBookOutInput {
  @Field(() => Int)
  product_id: number;

  @Field(() => Int)
  quantity: number;

  @Field(() =>Date ,{nullable :true} )
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date  

  @Field(()=>[Int])
  stored_product_id: [number];
}
