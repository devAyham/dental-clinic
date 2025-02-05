import { Module } from '@nestjs/common';
import { PatientSessionsService } from './patient_sessions.service';
import { PatientSessionsResolver } from './patient_sessions.resolver';

@Module({
  providers: [PatientSessionsResolver, PatientSessionsService]
})
export class PatientSessionsModule {}
