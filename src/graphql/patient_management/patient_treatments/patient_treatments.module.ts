import { Module } from '@nestjs/common';
import { PatientTreatmentsService } from './patient_treatments.service';
import { PatientTreatmentsResolver } from './patient_treatments.resolver';

@Module({
  providers: [PatientTreatmentsResolver, PatientTreatmentsService]
})
export class PatientTreatmentsModule {}
