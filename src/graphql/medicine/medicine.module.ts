import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineResolver } from './medicine.resolver';

@Module({
  providers: [MedicineResolver, MedicineService]
})
export class MedicineModule {}
