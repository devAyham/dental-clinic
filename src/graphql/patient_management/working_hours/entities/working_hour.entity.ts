import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Days } from '@prisma/client';

@ObjectType()
export class WorkingHour {
  @Field(() => Int)
  id: number;

  @Field(() => Days, { description: 'Sun Mon ...' })
  day: Days;

  @Field(() => Date)
  from: Date;

  @Field(() => Date)
  to: Date;

  @Field(() => Boolean)
  open: boolean;
}
