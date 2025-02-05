import { Module } from '@nestjs/common';
import { PatientAppointmentsService } from './patient_appointments.service';
import { PatientAppointmentsResolver } from './patient_appointments.resolver';

@Module({
  providers: [PatientAppointmentsResolver, PatientAppointmentsService]
})
export class PatientAppointmentsModule {}
