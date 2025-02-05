import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientMedicalImagesService } from './patient_medical_images.service';
import { PatientMedicalImage } from './entities/patient_medical_image.entity';
import { CreatePatientMedicalImageInput } from './dto/create-patient_medical_image.input';
import { UpdatePatientMedicalImageInput } from './dto/update-patient_medical_image.input';
import { ImagesUploaderService } from 'src/images_uploader/images_uploader.service';


@Resolver(() => PatientMedicalImage)
export class PatientMedicalImagesResolver {
  constructor(private readonly patientMedicalImagesService: PatientMedicalImagesService, ) { }

  @Mutation(() => PatientMedicalImage)
  createPatientMedicalImage(@Args('createPatientMedicalImageInput') createPatientMedicalImageInput: CreatePatientMedicalImageInput) {
    return this.patientMedicalImagesService.create(createPatientMedicalImageInput);
  }

  @Query(() => [PatientMedicalImage], { name: 'patientMedicalImages' })
  findAll(@Args('patient_id', { type: () => Int, nullable: true }) patient_id?: number,
    @Args('medical_image_type_id', { type: () => Int, nullable: true }) medical_image_type_id?: number) {
    return this.patientMedicalImagesService.findAll(patient_id, medical_image_type_id);
  }

  @Mutation(() => PatientMedicalImage)
  updatePatientMedicalImage(@Args('updatePatientMedicalImageInput') updatePatientMedicalImageInput: UpdatePatientMedicalImageInput) {
    return this.patientMedicalImagesService.update(updatePatientMedicalImageInput.id, updatePatientMedicalImageInput);
  }

  @Mutation(() => PatientMedicalImage)
  removePatientMedicalImage(@Args('id', { type: () => Int }) id: number) {
    return this.patientMedicalImagesService.remove(id);
  }
}
