import { CreateTreatmentTypeInput } from './create-treatment_type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTreatmentTypeInput extends PartialType(CreateTreatmentTypeInput) {
  @Field()
  name: string;
}
