import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class LabOrderStep {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;


}
