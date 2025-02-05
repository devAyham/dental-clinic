import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePatientTreatmentDoneStepInput {
  @Field(() => Int)
  patient_treatment_id: number;

  @Field(() => Int)
  step_id: number;

  @Field(() => Int)
  patient_session_id: number;

  @Field(() => String, { nullable: true })
  note?: string;
}
