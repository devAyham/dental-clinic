import { InputType, Int, Field } from '@nestjs/graphql';
import { CreatePatientPerscrptionsMedicienInput } from '../../patient_perscrptions_mediciens/dto/create-patient_perscrptions_medicien.input';

@InputType()
export class CreatePatientPerscrptionInput {
  @Field(() => Int)
  patient_session_id: number;

  @Field(() => [CreatePatientPerscrptionsMedicienInput])
  createPatientPerscrptionsMedicienInput: CreatePatientPerscrptionsMedicienInput[];
}
