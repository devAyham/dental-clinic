import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AppointmentStates, AppointmentTypes } from '@prisma/client';
import { Patient } from '../../patient/entities/patient.entity';
import { PatientSession } from '../../patient_sessions/entities/patient_session.entity';

@ObjectType()
export class PatientAppointment {
  @Field(() => Int, { description: 'id' })
  id: number;
  @Field(() => Int, { description: 'Patient id' })
  patient_id: number;

  @Field(() => Date, { description: 'appointment date' })
  date: Date

  @Field(() => AppointmentStates, { description: 'AppointmentStates' })
  state: AppointmentStates

  @Field(() => AppointmentTypes, { description: 'AppointmentTypes' })
  type: AppointmentTypes

  @Field(() => String, { description: 'treatment place', nullable: true })
  place?: string;

  @Field(() => String, { description: 'phase', nullable: true })
  phase?: string

  @Field(() => String, { description: 'notes', nullable: true })
  notes?: string

  @Field(() => Patient, { description: 'patient' })
  patient: Patient

  @Field(() => [PatientSession], { description: 'notes', nullable: true })
  PatientSession?: PatientSession[]
}
