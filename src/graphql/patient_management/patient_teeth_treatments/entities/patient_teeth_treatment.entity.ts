import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PatientTeethTreatment {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
