import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProblemTypeService } from './problem_type.service';
import { ProblemType } from './entities/problem_type.entity';
import { CreateProblemTypeInput } from './dto/create-problem_type.input';
import { UpdateProblemTypeInput } from './dto/update-problem_type.input';
import { checkIfExists, validator } from '../../validatior/validator';

@Resolver(() => ProblemType)
export class ProblemTypeResolver {
  constructor(private readonly problemTypeService: ProblemTypeService) { }

  @Mutation(() => ProblemType)
  createProblemType(
    @Args('createProblemTypeInput')
    createProblemTypeInput: CreateProblemTypeInput,
  ) {
    return this.problemTypeService.create(createProblemTypeInput);
  }

  @Query(() => [ProblemType], { name: 'problemTypes' })
  findAll() {
    return this.problemTypeService.findAll();
  }

  @Query(() => ProblemType, { name: 'problemType' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'problemType' });
    return this.problemTypeService.findOne(id);
  }

  @Mutation(() => ProblemType)
  async updateProblemType(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProblemTypeInput')updateProblemTypeInput: UpdateProblemTypeInput,
  ) {
    await validator(checkIfExists)({ id, modelName: 'problemType' });
    return this.problemTypeService.update(id,updateProblemTypeInput)
  }

  @Mutation(() => ProblemType)
  async removeProblemType(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'problemType' });
    return this.problemTypeService.remove(id);
  }
}
