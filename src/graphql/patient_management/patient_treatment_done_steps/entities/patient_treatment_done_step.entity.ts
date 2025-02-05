import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PatientTreatment } from '../../patient_treatments/entities/patient_treatment.entity';
import { Steps } from 'src/graphql/treatment/entities/step.entity';
import { PatientSession } from '../../patient_sessions/entities/patient_session.entity';

@ObjectType()
export class PatientTreatmentDoneStep {
  @Field(() => Int,)
  id: number;

  @Field(() => Int,)
  patient_treatment_id: number;

  @Field(() => Int,)
  step_id: number;

  @Field(() => Int,)
  patient_session_id: number;

  @Field(() => String, { nullable: true })
  note?: string;

  @Field(() => PatientTreatment)
  patient_treatment: PatientTreatment;

  @Field(() => Steps)
  step: Steps;

  @Field(() => PatientSession)
  session: PatientSession;

}
