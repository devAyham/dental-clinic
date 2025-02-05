import { Module } from '@nestjs/common';
import { PatientTreatmentDoneStepsService } from './patient_treatment_done_steps.service';
import { PatientTreatmentDoneStepsResolver } from './patient_treatment_done_steps.resolver';

@Module({
  providers: [PatientTreatmentDoneStepsResolver, PatientTreatmentDoneStepsService]
})
export class PatientTreatmentDoneStepsModule {}
