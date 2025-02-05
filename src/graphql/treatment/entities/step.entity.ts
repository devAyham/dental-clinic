import { Field, Int, ObjectType } from "@nestjs/graphql";
import { SubStep } from "./sub_step.entity";

@ObjectType()
export class Steps {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  treatment_id: number;

  @Field(() => [SubStep],{ nullable: true })
  subSteps?: SubStep[];
}
