import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePatientMedicalImagesTypeInput {
  @Field(() => String)
  name: string;
}
