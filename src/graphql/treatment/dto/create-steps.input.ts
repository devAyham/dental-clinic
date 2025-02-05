import { Field, InputType } from "@nestjs/graphql";
import { CreateSubStepInput } from "./create-sub-steps.input";

@InputType()
export class CreateStepInput {
  @Field(() => String)
  name: string;


  @Field(() => [CreateSubStepInput], { nullable: true })
  subSteps?: CreateSubStepInput[];
}