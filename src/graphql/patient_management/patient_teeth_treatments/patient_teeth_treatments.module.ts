import { Module } from '@nestjs/common';
import { PatientTeethTreatmentsService } from './patient_teeth_treatments.service';
import { PatientTeethTreatmentsResolver } from './patient_teeth_treatments.resolver';

@Module({
  providers: [PatientTeethTreatmentsResolver, PatientTeethTreatmentsService]
})
export class PatientTeethTreatmentsModule {}
