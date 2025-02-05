import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Patient } from '../../patient/entities/patient.entity';

@ObjectType()
export class PatientReservation {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  patient_id: number;

  @Field(() => Date)
  date: Date;

  @Field(() => String, { nullable: true })
  notes?: string;

  @Field(() => Patient)
  patient: Patient;
}
