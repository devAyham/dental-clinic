import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientMedicinesService } from './patient_medicines.service';
import { PatientMedicine } from './entities/patient_medicine.entity';
import { UpdatePatientMedicineInput } from './dto/update-patient_medicine.input';
import { CreatePatientMedicineForExistingPatientInput } from './dto/create-patient_medicine-4-existing-patient.input';

@Resolver(() => PatientMedicine)
export class PatientMedicinesResolver {
  constructor(private readonly patientMedicinesService: PatientMedicinesService) {}

  @Mutation(() => PatientMedicine)
  createPatientMedicine(@Args('createPatientMedicineInput') createPatientMedicineInput: CreatePatientMedicineForExistingPatientInput) {
    return this.patientMedicinesService.create(createPatientMedicineInput);
  }

  @Query(() => [PatientMedicine], { name: 'patientMedicines' })
  findAll(@Args('patient_id', { type: () => Int }) patient_id: number) {
    return this.patientMedicinesService.findAll(patient_id);
  }

  // @Query(() => PatientMedicine, { name: 'patientMedicine' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.patientMedicinesService.findOne(id);
  // }

  @Mutation(() => PatientMedicine)
  updatePatientMedicine(@Args('updatePatientMedicineInput') updatePatientMedicineInput: UpdatePatientMedicineInput) {
    return this.patientMedicinesService.update(updatePatientMedicineInput.id, updatePatientMedicineInput);
  }

  @Mutation(() => PatientMedicine)
  removePatientMedicine(@Args('id', { type: () => Int }) id: number) {
    return this.patientMedicinesService.remove(id);
  }
}
