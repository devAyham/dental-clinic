import { Module } from '@nestjs/common';
import { PatientPaymentsService } from './patient_payments.service';
import { PatientPaymentsResolver } from './patient_payments.resolver';

@Module({
  providers: [PatientPaymentsResolver, PatientPaymentsService]
})
export class PatientPaymentsModule {}
