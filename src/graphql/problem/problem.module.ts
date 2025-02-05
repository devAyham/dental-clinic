import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemResolver } from './problem.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ProblemResolver, ProblemService, PrismaService]
})
export class ProblemModule { }
