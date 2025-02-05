import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientPerscrptionsMediciensService } from './patient_perscrptions_mediciens.service';
import { PatientPerscrptionsMedicien } from './entities/patient_perscrptions_medicien.entity';
import { CreatePatientPerscrptionsMedicienInput } from './dto/create-patient_perscrptions_medicien.input';
import { UpdatePatientPerscrptionsMedicienInput } from './dto/update-patient_perscrptions_medicien.input';
import { Conflict } from 'src/graphql/medicine/entities/conflict';

@Resolver(() => PatientPerscrptionsMedicien)
export class PatientPerscrptionsMediciensResolver {
  constructor(private readonly patientPerscrptionsMediciensService: PatientPerscrptionsMediciensService) { }

  @Mutation(() => PatientPerscrptionsMedicien)
  createPatientPerscrptionsMedicien(@Args('createPatientPerscrptionsMedicienInput') createPatientPerscrptionsMedicienInput: CreatePatientPerscrptionsMedicienInput) {
    return this.patientPerscrptionsMediciensService.create(createPatientPerscrptionsMedicienInput);
  }

  @Query(() => [PatientPerscrptionsMedicien], { name: 'patientPerscrptionsMediciens' })
  findAll(@Args('patient_perscrption_id', { type: () => Int, nullable: true }) patient_perscrption_id?: number) {
    return this.patientPerscrptionsMediciensService.findAll({ patient_perscrption_id });
  }

  @Query(() => Conflict, { name: 'checkConflictsForPerscriptionMedicines' })
  checkConflicts(
    @Args('profile_id', { type: () => Int }) profile_id: number,
    @Args('medicine_ids', { type: () => [Int] }) medicine_ids: number[]
    ) {
    return this.patientPerscrptionsMediciensService.checkConflicts(profile_id,medicine_ids);
  }

  @Query(() => PatientPerscrptionsMedicien, { name: 'patientPerscrptionsMedicien' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.patientPerscrptionsMediciensService.findOne(id);
  }

  @Mutation(() => PatientPerscrptionsMedicien)
  updatePatientPerscrptionsMedicien(@Args('updatePatientPerscrptionsMedicienInput') updatePatientPerscrptionsMedicienInput: UpdatePatientPerscrptionsMedicienInput) {
    return this.patientPerscrptionsMediciensService.update(updatePatientPerscrptionsMedicienInput.id, updatePatientPerscrptionsMedicienInput);
  }

  @Mutation(() => PatientPerscrptionsMedicien)
  removePatientPerscrptionsMedicien(@Args('id', { type: () => Int }) id: number) {
    return this.patientPerscrptionsMediciensService.remove(id);
  }
}
