import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { AppointmentStates, AppointmentTypes } from '@prisma/client';



registerEnumType(AppointmentStates, {
  name: 'AppointmentStates'
});
registerEnumType(AppointmentTypes, {
  name: 'AppointmentTypes',
});
@InputType()
export class CreatePatientAppointmentInput {
  @Field(() => Int, { description: 'Patient id' })
  patient_id: number;

  @Field(() => String, { description: 'treatment place', nullable: true })
  place?: string;

  @Field(() => Date, { description: 'appointment date' })
  date: Date

  @Field(() => AppointmentTypes, { description: 'AppointmentTypes' })
  type: AppointmentTypes

  @Field(() => String, { description: 'phase', nullable: true })
  phase?: string

  @Field(() => String, { description: 'notes', nullable: true })
  notes?: string

  @Field(() => Int, { description: 'reservation', nullable: true })
  reservation_id?: number

}
