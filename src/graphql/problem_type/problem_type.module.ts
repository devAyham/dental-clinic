import { Module } from '@nestjs/common';
import { ProblemTypeService } from './problem_type.service';
import { ProblemTypeResolver } from './problem_type.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ProblemTypeResolver, ProblemTypeService, PrismaService],
})
export class ProblemTypeModule {}
