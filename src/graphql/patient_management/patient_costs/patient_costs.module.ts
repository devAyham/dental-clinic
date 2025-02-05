import { Module } from '@nestjs/common';
import { PatientCostsService } from './patient_costs.service';
import { PatientCostsResolver } from './patient_costs.resolver';

@Module({
  providers: [PatientCostsResolver, PatientCostsService]
})
export class PatientCostsModule {}
