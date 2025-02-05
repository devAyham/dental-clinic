import { Module } from '@nestjs/common';
import { PatientDiseasesService } from './patient_diseases.service';
import { PatientDiseasesResolver } from './patient_diseases.resolver';

@Module({
  providers: [PatientDiseasesResolver, PatientDiseasesService]
})
export class PatientDiseasesModule {}
