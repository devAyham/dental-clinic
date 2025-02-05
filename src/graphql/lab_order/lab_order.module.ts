import { Module } from '@nestjs/common';
import { LabOrderService } from './lab_order.service';
import { LabOrderResolver } from './lab_order.resolver';

@Module({
  providers: [LabOrderResolver, LabOrderService]
})
export class LabOrderModule {}
