import { Module } from '@nestjs/common';
import { PatientMedicalImagesTypesService } from './patient_medical_images_types.service';
import { PatientMedicalImagesTypesResolver } from './patient_medical_images_types.resolver';

@Module({
  providers: [PatientMedicalImagesTypesResolver, PatientMedicalImagesTypesService]
})
export class PatientMedicalImagesTypesModule {}
