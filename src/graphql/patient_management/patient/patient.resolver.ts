import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientService } from './patient.service';
import { Patient } from './entities/patient.entity';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { PaginatedPatient } from './entities/PaginatedPatient';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(private readonly patientService: PatientService) { }

  @Mutation(() => Patient)
  createPatient(@Args('createPatientInput') createPatientInput: CreatePatientInput) {
    return this.patientService.create(createPatientInput);
  }

  @Query(() => PaginatedPatient, { name: 'patients' })
  async findAll(
    @Args('search', { nullable: true }) search?: string,
    @Args('page', { nullable: true }) page?: number,
    @Args('item_per_page', { nullable: true }) item_per_page?: number,
  ) {
    const data = await this.patientService.findAll(page, item_per_page,search)
    return {
      ...data,
      items: data.data,
    };
  }

  @Query(() => Patient, { name: 'patient' })
  findOne(@Args('id', { type: () => Int }) id: number) {

    return this.patientService.findOne(id);
  }

  @Mutation(() => Patient)
  updatePatient(@Args('updatePatientInput') updatePatientInput: UpdatePatientInput) {
    return this.patientService.update(updatePatientInput.id, updatePatientInput);
  }

  @Mutation(() => Patient)
  removePatient(@Args('id', { type: () => Int }) id: number) {
    return this.patientService.remove(id);
  }
}
