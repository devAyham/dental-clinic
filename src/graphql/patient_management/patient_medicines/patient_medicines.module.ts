import { Module } from '@nestjs/common';
import { PatientMedicinesService } from './patient_medicines.service';
import { PatientMedicinesResolver } from './patient_medicines.resolver';

@Module({
  providers: [PatientMedicinesResolver, PatientMedicinesService]
})
export class PatientMedicinesModule {}
