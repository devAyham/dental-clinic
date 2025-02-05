import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientSessionsService } from './patient_sessions.service';
import { PatientSession } from './entities/patient_session.entity';
import { CreatePatientSessionInput } from './dto/create-patient_session.input';
import { UpdatePatientSessionInput } from './dto/update-patient_session.input';

@Resolver(() => PatientSession)
export class PatientSessionsResolver {
  constructor(private readonly patientSessionsService: PatientSessionsService) { }

  @Mutation(() => PatientSession)
  createPatientSession(@Args('createPatientSessionInput') createPatientSessionInput: CreatePatientSessionInput) {
    return this.patientSessionsService.create(createPatientSessionInput);
  }

  @Query(() => [PatientSession], { name: 'patientSessions' })
  findAll(@Args('patient_id', { type: () => Int, nullable: true }) patient_id?: number) {
    return this.patientSessionsService.findAll({ patient_id });
  }

  @Query(() => PatientSession, { name: 'patientSession' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.patientSessionsService.findOne(id);
  }

  @Mutation(() => PatientSession)
  updatePatientSession(@Args('updatePatientSessionInput') updatePatientSessionInput: UpdatePatientSessionInput) {
    return this.patientSessionsService.update(updatePatientSessionInput.id, updatePatientSessionInput);
  }

  @Mutation(() => PatientSession)
  removePatientSession(@Args('id', { type: () => Int }) id: number) {
    return this.patientSessionsService.remove(id);
  }
}
