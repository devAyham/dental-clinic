import { InputType, Int, Field } from '@nestjs/graphql';
import { CreatePatientTreatmentDoneStepFromSessionInput } from '../../patient_treatment_done_steps/dto/create-patient_treatment_done_step_from_session.input';
import { CreatePatientLabOrderFromSessionInput } from '../../patient_lab_orders/dto/create-patient_lab_order_from_session.input';
import { CreatePatientPerscrptionFromSessionInput } from '../../patient_perscrptions/dto/create-patient_perscrption_from_session.input';

@InputType()
export class CreatePatientSessionInput {
  @Field(() => Int)
  patient_id: number;

  @Field(() => Int)
  patiient_appointment_id: number;

  @Field(() => [CreatePatientTreatmentDoneStepFromSessionInput])
  CreatePatientTreatmentDoneStepFromSessionInput: CreatePatientTreatmentDoneStepFromSessionInput[];

  @Field(() => CreatePatientPerscrptionFromSessionInput, { nullable: true })
  createPatientPerscrptionFromSessionInput?: CreatePatientPerscrptionFromSessionInput;

  @Field(() => CreatePatientLabOrderFromSessionInput, { nullable: true })
  createPatientLabOrderFromSessionInput?: CreatePatientLabOrderFromSessionInput;
}
