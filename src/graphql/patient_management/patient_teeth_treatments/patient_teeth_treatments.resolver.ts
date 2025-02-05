import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientTeethTreatmentsService } from './patient_teeth_treatments.service';
import { PatientTeethTreatment } from './entities/patient_teeth_treatment.entity';
import { CreatePatientTeethTreatmentInput } from './dto/create-patient_teeth_treatment.input';
import { UpdatePatientTeethTreatmentInput } from './dto/update-patient_teeth_treatment.input';

@Resolver(() => PatientTeethTreatment)
export class PatientTeethTreatmentsResolver {
  constructor(private readonly patientTeethTreatmentsService: PatientTeethTreatmentsService) {}

  @Mutation(() => PatientTeethTreatment)
  createPatientTeethTreatment(@Args('createPatientTeethTreatmentInput') createPatientTeethTreatmentInput: CreatePatientTeethTreatmentInput) {
    return this.patientTeethTreatmentsService.create(createPatientTeethTreatmentInput);
  }

  @Query(() => [PatientTeethTreatment], { name: 'patientTeethTreatments' })
  findAll() {
    return this.patientTeethTreatmentsService.findAll();
  }

  @Query(() => PatientTeethTreatment, { name: 'patientTeethTreatment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.patientTeethTreatmentsService.findOne(id);
  }

  @Mutation(() => PatientTeethTreatment)
  updatePatientTeethTreatment(@Args('updatePatientTeethTreatmentInput') updatePatientTeethTreatmentInput: UpdatePatientTeethTreatmentInput) {
    return this.patientTeethTreatmentsService.update(updatePatientTeethTreatmentInput.id, updatePatientTeethTreatmentInput);
  }

  @Mutation(() => PatientTeethTreatment)
  removePatientTeethTreatment(@Args('id', { type: () => Int }) id: number) {
    return this.patientTeethTreatmentsService.remove(id);
  }
}
