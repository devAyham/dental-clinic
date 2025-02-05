import { CreatePatientPerscrptionsMedicienInput } from './create-patient_perscrptions_medicien.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientPerscrptionsMedicienInput extends PartialType(CreatePatientPerscrptionsMedicienInput) {
  @Field(() => Int)
  id: number;
}
