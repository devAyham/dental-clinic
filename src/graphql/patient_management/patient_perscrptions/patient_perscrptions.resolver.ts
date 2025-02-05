import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientPerscrptionsService } from './patient_perscrptions.service';
import { PatientPerscrption } from './entities/patient_perscrption.entity';
import { CreatePatientPerscrptionInput } from './dto/create-patient_perscrption.input';

@Resolver(() => PatientPerscrption)
export class PatientPerscrptionsResolver {
  constructor(private readonly patientPerscrptionsService: PatientPerscrptionsService) { }

  @Mutation(() => PatientPerscrption)
  createPatientPerscrption(@Args('createPatientPerscrptionInput') createPatientPerscrptionInput: CreatePatientPerscrptionInput) {
    return this.patientPerscrptionsService.create(createPatientPerscrptionInput);
  }

  @Query(() => [PatientPerscrption], { name: 'patientPerscrptions' })
  findAll(@Args('patient_id', { type: () => Int, nullable: true }) patient_id?: number,
    @Args('patient_session_id', { type: () => Int, nullable: true }) patient_session_id?: number) {
    return this.patientPerscrptionsService.findAll({
      patient_id, patient_session_id
    });
  }

  @Query(() => PatientPerscrption, { name: 'patientPerscrption' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.patientPerscrptionsService.findOne(id);
  }

  @Mutation(() => PatientPerscrption)
  removePatientPerscrption(@Args('id', { type: () => Int }) id: number) {
    return this.patientPerscrptionsService.remove(id);
  }
}
