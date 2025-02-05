import { Module } from '@nestjs/common';
import { WorkingHoursService } from './working_hours.service';
import { WorkingHoursResolver } from './working_hours.resolver';

@Module({
  providers: [WorkingHoursResolver, WorkingHoursService]
})
export class WorkingHoursModule {}
