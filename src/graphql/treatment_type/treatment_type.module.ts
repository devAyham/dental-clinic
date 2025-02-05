import { Module } from '@nestjs/common';
import { TreatmentTypeService } from './treatment_type.service';
import { TreatmentTypeResolver } from './treatment_type.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TreatmentTypeResolver, TreatmentTypeService, PrismaService]
})
export class TreatmentTypeModule {}
