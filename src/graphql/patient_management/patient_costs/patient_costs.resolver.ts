import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientCostsService } from './patient_costs.service';
import { PatientCost } from './entities/patient_cost.entity';
import { CreatePatientCostInput } from './dto/create-patient_cost.input';
import { UpdatePatientCostInput } from './dto/update-patient_cost.input';
import { PaginatedPatientCost } from './entities/paginated_patient_costs';
import { PatientCostSortInput } from './dto/sort-input';

@Resolver(() => PatientCost)
export class PatientCostsResolver {
  constructor(private readonly patientCostsService: PatientCostsService) { }

  @Mutation(() => PatientCost)
  createPatientCost(@Args('createPatientCostInput') createPatientCostInput: CreatePatientCostInput) {
    return this.patientCostsService.create(createPatientCostInput);
  }

  @Query(() => PaginatedPatientCost, { name: 'patientCosts' })
  async findAll(@Args('page', { nullable: true }) page?: number,
    @Args('item_per_page', { nullable: true }) item_per_page?: number,
    @Args('patient_id', { type: () => Int, nullable: true }) patient_id?: number,
    @Args('sort', { type: () => PatientCostSortInput, nullable: true }) sort?: PatientCostSortInput) {
    const data = await this.patientCostsService.findAll({ patient_id, sort, item_per_page, page });
    return data
  }

  // @Query(() => PatientCost, { name: 'patientCost' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.patientCostsService.findOne(id);
  // }

  @Mutation(() => PatientCost)
  updatePatientCost(@Args('updatePatientCostInput') updatePatientCostInput: UpdatePatientCostInput) {
    return this.patientCostsService.update(updatePatientCostInput.id, updatePatientCostInput);
  }

  @Mutation(() => PatientCost)
  removePatientCost(@Args('id', { type: () => Int }) id: number) {
    return this.patientCostsService.remove(id);
  }
}
