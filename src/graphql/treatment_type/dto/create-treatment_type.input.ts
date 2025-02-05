import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTreatmentTypeInput {
  @Field()
  name: string;
}
