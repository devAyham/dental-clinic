import { Module } from '@nestjs/common';
import { BadHabitService } from './bad_habit.service';
import { BadHabitResolver } from './bad_habit.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [BadHabitResolver, BadHabitService, PrismaService]
})
export class BadHabitModule {}
