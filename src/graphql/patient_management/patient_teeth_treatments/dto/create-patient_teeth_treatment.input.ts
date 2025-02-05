import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePatientTeethTreatmentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
