import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TreatmentTypeService } from './treatment_type.service';
import { TreatmentType } from './entities/treatment_type.entity';
import { CreateTreatmentTypeInput } from './dto/create-treatment_type.input';
import { UpdateTreatmentTypeInput } from './dto/update-treatment_type.input';
import { checkIfExists, validator } from '../../validatior/validator';

@Resolver(() => TreatmentType)
export class TreatmentTypeResolver {
  constructor(private readonly treatmentTypeService: TreatmentTypeService) {}

  @Mutation(() => TreatmentType)
  createTreatmentType(@Args('createTreatmentTypeInput') createTreatmentTypeInput: CreateTreatmentTypeInput) {
    return this.treatmentTypeService.create(createTreatmentTypeInput);
  }

  @Query(() => [TreatmentType], { name: 'treatmentTypes' })
  findAll() {
    return this.treatmentTypeService.findAll();
  }

  @Query(() => TreatmentType, { name: 'treatmentType' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'treatmentType' });
    return this.treatmentTypeService.findOne(id);
  }

  @Mutation(() => TreatmentType)
  async updateTreatmentType(
  @Args('id', { type: () => Int }) id: number,
  @Args('updateTreatmentTypeInput') updateTreatmentTypeInput: UpdateTreatmentTypeInput) {
    await validator(checkIfExists)({ id, modelName: 'treatmentType' });
    return this.treatmentTypeService.update(id, updateTreatmentTypeInput);
  }

  @Mutation(() => TreatmentType)
  async removeTreatmentType(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'treatmentType' });
    return this.treatmentTypeService.remove(id);
  }
}
