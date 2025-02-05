import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateSubStepInput {
  @Field(() => String)
  name: string;
}