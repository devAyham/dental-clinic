import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Notification {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  msg: string;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  user_id: number;

  @Field(() => Date)
  date: Date;

  @Field(() => Boolean)
  seen: boolean;
  
}
