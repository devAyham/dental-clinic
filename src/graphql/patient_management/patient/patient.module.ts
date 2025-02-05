import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientResolver } from './patient.resolver';
import { PatientDiseasesService } from '../patient_diseases/patient_diseases.service';

@Module({
  providers: [
    PatientResolver, PatientService ,PatientDiseasesService ]
})
export class PatientModule { }
