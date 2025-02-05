import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PatientTreatmentDoneStep } from '../../patient_treatment_done_steps/entities/patient_treatment_done_step.entity';
import { Patient } from '../../patient/entities/patient.entity';
import { PatientAppointment } from '../../patient_appointments/entities/patient_appointment.entity';
import { PatientLabOrder } from '../../patient_lab_orders/entities/patient_lab_order.entity';
import { PatientPerscrption } from '../../patient_perscrptions/entities/patient_perscrption.entity';
import { Treatment } from 'src/graphql/treatment/entities/treatment.entity';

@ObjectType()
export class PatientSession {
  @Field(() => Int)
  patient_id: number;

  @Field(() => Int)
  patiient_appointment_id: number;

  @Field(() => Patient)
  patient: Patient;

  @Field(() => PatientAppointment)
  patient_appointment: PatientAppointment;

  @Field(() => [PatientTreatmentDoneStep], { nullable: true })
  PatientTreatmentDoneStep?: PatientTreatmentDoneStep[];

  @Field(() => [PatientLabOrder], { nullable: true })
  PatientLabOrder?: PatientLabOrder[];

  @Field(() => [PatientPerscrption], { nullable: true })
  PatientPerscrptions?: PatientPerscrption[];

  @Field(() => Treatment, { nullable: true })
  Treatment?: Treatment;

}
