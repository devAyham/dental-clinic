import { ObjectType, Field, Int, Float, registerEnumType } from '@nestjs/graphql';
import { PatientTreatmentStatuses, PatientTreatmentTypes } from '@prisma/client';
import { Patient } from '../../patient/entities/patient.entity';
import { Treatment } from 'src/graphql/treatment/entities/treatment.entity';
import { PatientTreatmentDoneStep } from '../../patient_treatment_done_steps/entities/patient_treatment_done_step.entity';
registerEnumType(PatientTreatmentStatuses, {
  name: 'PatientTreatmentStatuses'
})
@ObjectType()
export class PatientTreatment {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  patient_id: number;

  @Field(() => Int)
  treatment_id: number;

  @Field(() => String)
  place: string;

  @Field(() => Float)
  price: number;

  @Field(() => PatientTreatmentTypes)
  type: PatientTreatmentTypes;

  @Field(() => PatientTreatmentStatuses)
  status: PatientTreatmentStatuses;

  @Field(() => Patient)
  patient: Patient;

  @Field(() => Treatment)
  treatment: Treatment;

  @Field(() => [PatientTreatmentDoneStep], { nullable: true })
  PatientTreatmentDoneStep?: PatientTreatmentDoneStep[];

}
