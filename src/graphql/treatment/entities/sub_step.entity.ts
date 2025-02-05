import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SubStep {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  step_id: number;
}
