import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TreatmentType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
