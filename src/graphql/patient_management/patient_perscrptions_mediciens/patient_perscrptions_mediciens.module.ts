import { Module } from '@nestjs/common';
import { PatientPerscrptionsMediciensService } from './patient_perscrptions_mediciens.service';
import { PatientPerscrptionsMediciensResolver } from './patient_perscrptions_mediciens.resolver';
import { MedicineService } from 'src/graphql/medicine/medicine.service';

@Module({
  providers: [MedicineService,PatientPerscrptionsMediciensResolver, PatientPerscrptionsMediciensService]
})
export class PatientPerscrptionsMediciensModule {}
