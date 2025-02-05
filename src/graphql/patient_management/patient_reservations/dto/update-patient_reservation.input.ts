import { CreatePatientReservationInput } from './create-patient_reservation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientReservationInput extends PartialType(CreatePatientReservationInput) {
  @Field(() => Int)
  id: number;
}
