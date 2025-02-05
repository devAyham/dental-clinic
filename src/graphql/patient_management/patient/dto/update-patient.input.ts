import { CreatePatientInput } from './create-patient.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientInput extends PartialType(
  OmitType(CreatePatientInput, ['patient_diseases', 'patient_badHabits', 'patient_medicines' , 'phone']),
) {
  @Field(() => Int)
  id: number;
}
