import { Module } from '@nestjs/common';
import { PatientLabOrdersService } from './patient_lab_orders.service';
import { PatientLabOrdersResolver } from './patient_lab_orders.resolver';

@Module({
  providers: [PatientLabOrdersResolver, PatientLabOrdersService]
})
export class PatientLabOrdersModule {}
