import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientMedicalImagesTypesService } from './patient_medical_images_types.service';
import { PatientMedicalImagesType } from './entities/patient_medical_images_type.entity';
import { CreatePatientMedicalImagesTypeInput } from './dto/create-patient_medical_images_type.input';
import { UpdatePatientMedicalImagesTypeInput } from './dto/update-patient_medical_images_type.input';

@Resolver(() => PatientMedicalImagesType)
export class PatientMedicalImagesTypesResolver {
  constructor(private readonly patientMedicalImagesTypesService: PatientMedicalImagesTypesService) {}

  @Mutation(() => PatientMedicalImagesType)
  createPatientMedicalImagesType(@Args('createPatientMedicalImagesTypeInput') createPatientMedicalImagesTypeInput: CreatePatientMedicalImagesTypeInput) {
    return this.patientMedicalImagesTypesService.create(createPatientMedicalImagesTypeInput);
  }

  @Query(() => [PatientMedicalImagesType], { name: 'patientMedicalImagesTypes' })
  findAll() {
    return this.patientMedicalImagesTypesService.findAll();
  }

  @Query(() => PatientMedicalImagesType, { name: 'patientMedicalImagesType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.patientMedicalImagesTypesService.findOne(id);
  }

  @Mutation(() => PatientMedicalImagesType)
  updatePatientMedicalImagesType(@Args('updatePatientMedicalImagesTypeInput') updatePatientMedicalImagesTypeInput: UpdatePatientMedicalImagesTypeInput) {
    return this.patientMedicalImagesTypesService.update(updatePatientMedicalImagesTypeInput.id, updatePatientMedicalImagesTypeInput);
  }

  @Mutation(() => PatientMedicalImagesType)
  removePatientMedicalImagesType(@Args('id', { type: () => Int }) id: number) {
    return this.patientMedicalImagesTypesService.remove(id);
  }
}
