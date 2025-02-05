import { Module } from '@nestjs/common';
import { PatientReservationsService } from './patient_reservations.service';
import { PatientReservationsResolver } from './patient_reservations.resolver';

@Module({
  providers: [PatientReservationsResolver, PatientReservationsService]
})
export class PatientReservationsModule {}
