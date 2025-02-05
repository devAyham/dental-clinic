import { Module } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { DiseaseResolver } from './disease.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DiseaseResolver, DiseaseService,PrismaService]
})
export class DiseaseModule {}
// 