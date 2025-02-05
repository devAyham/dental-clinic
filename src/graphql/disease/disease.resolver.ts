import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DiseaseService } from './disease.service';
import { Disease } from './entities/disease.entity';
import { CreateDiseaseInput } from './dto/create-disease.input';
import { UpdateDiseaseInput } from './dto/update-disease.input';
import { Paginatedisease } from './entities/Paginatedisease';
import { checkIfExists, validator } from '../../validatior/validator';
import { createDisease, updateDisease } from './validation/disease.validation';

@Resolver(() => Disease)
export class DiseaseResolver {
  constructor(private readonly diseaseService: DiseaseService) {}

  @Mutation(() => Disease)
  async createDisease(
    @Args('createDiseaseInput') createDiseaseInput: CreateDiseaseInput,
  ) {
    await validator(createDisease)({ data: createDiseaseInput });

    return await this.diseaseService.create(createDiseaseInput);
  }

  @Query(() => Paginatedisease, { name: 'diseases' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('search', { nullable: true }) serach?: string,
    @Args('item_per_page', { nullable: true }) item_per_page?: number,
  ) {
    const disease = await this.diseaseService.findAll(
      page,
      item_per_page,
      serach,
    );
    return {
      items: disease.data,
      totalPages: disease.totalPages,
      page: disease.page,
      item_per_page: disease.item_per_page,
    };
  }

  @Query(() => Disease, { name: 'disease' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'disease' });
    return this.diseaseService.findOne(id);
  }

  @Mutation(() => Disease)
  async updateDisease(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateDiseaseInput') updateDiseaseInput: UpdateDiseaseInput,
  ) {
    await validator(updateDisease)({
      data: updateDiseaseInput,
      modelName: 'disease',
      id: id,
    });
    return this.diseaseService.update(id, updateDiseaseInput);
  }

  @Mutation(() => Disease)
  async removeDisease(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'disease' });
    return this.diseaseService.remove(id);
  }
}
