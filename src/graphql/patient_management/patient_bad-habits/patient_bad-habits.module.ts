import { Module } from '@nestjs/common';
import { PatientBadHabitsService } from './patient_bad-habits.service';
import { PatientBadHabitsResolver } from './patient_bad-habits.resolver';

@Module({
  providers: [PatientBadHabitsResolver, PatientBadHabitsService]
})
export class PatientBadHabitsModule {}
