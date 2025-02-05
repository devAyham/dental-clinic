import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientDiagnosesService } from './patient_diagnoses.service';
import { CreatePatientDiagnosisInput } from './dto/create-patient_diagnosis.input';
import { UpdatePatientDiagnosisInput } from './dto/update-patient_diagnosis.input';
import { PaginatedPatientDiagnosis } from './entities/PaginatedPatient';
import { PatientDiagnosis } from './entities/patient_diagnosis.entity';

@Resolver(() => PatientDiagnosis)
export class PatientDiagnosesResolver {
  constructor(private readonly patientDiagnosesService: PatientDiagnosesService) { }

  @Mutation(() => PatientDiagnosis)
  createPatientDiagnosis(@Args('createPatientDiagnosisInput') createPatientDiagnosisInput: CreatePatientDiagnosisInput) {
    return this.patientDiagnosesService.create(createPatientDiagnosisInput);
  }

  @Query(() => PaginatedPatientDiagnosis, { name: 'patientDiagnoses' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('item_per_page', { nullable: true }) item_per_page?: number,
    @Args('patient_id', { nullable: true }) patient_id?: number,
    @Args('problem_type_id', { nullable: true }) problem_type_id?: number,
  ) {
    const data = await this.patientDiagnosesService.findAll({
      item_per_page, page, patient_id, problem_type_id
    });
    return {
      ...data,
      items: data.data
    }
  }

  @Query(() => PatientDiagnosis, { name: 'patientDiagnose' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.patientDiagnosesService.findOne(id);
  }

  @Mutation(() => PatientDiagnosis)
  updatePatientDiagnosis(@Args('updatePatientDiagnoseInput') updatePatientDiagnosisInput: UpdatePatientDiagnosisInput) {
    return this.patientDiagnosesService.update(updatePatientDiagnosisInput.id, updatePatientDiagnosisInput);
  }

  @Mutation(() => PatientDiagnosis)
  removePatientDiagnosis(@Args('id', { type: () => Int }) id: number) {
    return this.patientDiagnosesService.remove(id);
  }
}
