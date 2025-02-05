import { CreatePatientAppointmentInput } from './create-patient_appointment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientAppointmentInput extends PartialType(CreatePatientAppointmentInput) {
  @Field(() => Int)
  id: number;
}
