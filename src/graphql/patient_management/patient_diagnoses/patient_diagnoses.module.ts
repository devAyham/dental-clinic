import { Module } from '@nestjs/common';
import { PatientDiagnosesService } from './patient_diagnoses.service';
import { PatientDiagnosesResolver } from './patient_diagnoses.resolver';

@Module({
  providers: [PatientDiagnosesResolver, PatientDiagnosesService]
})
export class PatientDiagnosesModule {}
