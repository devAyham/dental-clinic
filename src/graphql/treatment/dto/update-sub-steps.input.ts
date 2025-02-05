import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateSubStepInput {
  @Field(() => String)
  name: string;
}