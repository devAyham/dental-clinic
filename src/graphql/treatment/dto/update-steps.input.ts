import { Field, InputType } from "@nestjs/graphql";
import { UpdateSubStepInput } from "./update-sub-steps.input";

@InputType()
export class UpdateStepInput {
  @Field(() => String)
  name: string;

  @Field(() => [UpdateSubStepInput], { nullable: true })
  subSteps?: UpdateSubStepInput[];
}