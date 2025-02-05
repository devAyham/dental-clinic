import { InputType, Field } from '@nestjs/graphql';
import { CreatePatientPerscrptionsMedicienFromSessionInput } from '../../patient_perscrptions_mediciens/dto/create-patient_perscrptions_medicien_from_session.input';

@InputType()
export class CreatePatientPerscrptionFromSessionInput {
  @Field(() => [CreatePatientPerscrptionsMedicienFromSessionInput])
  PatientPerscrptionsMedicince: CreatePatientPerscrptionsMedicienFromSessionInput[];
}
