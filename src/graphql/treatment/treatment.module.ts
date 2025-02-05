import { Module } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentResolver } from './treatment.resolver';

@Module({
  providers: [TreatmentResolver, TreatmentService]
})
export class TreatmentModule {}
