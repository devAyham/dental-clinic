import { InputType, Int, Field, Float, registerEnumType } from '@nestjs/graphql';
import { PatientTreatmentTypes } from '@prisma/client';


registerEnumType(PatientTreatmentTypes, {
  name: 'PatientTreatmentTypes'
})
@InputType()
export class CreatePatientTreatmentInput {
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
}
