import { Module } from '@nestjs/common';
import { PatientPerscrptionsService } from './patient_perscrptions.service';
import { PatientPerscrptionsResolver } from './patient_perscrptions.resolver';

@Module({
  providers: [PatientPerscrptionsResolver, PatientPerscrptionsService]
})
export class PatientPerscrptionsModule {}
