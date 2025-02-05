import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProblemService } from './problem.service';
import { CreateProblemInput } from './dto/create-problem.input';
import { UpdateProblemInput } from './dto/update-problem.input';

import { Problem } from './entities/problem.entity';
import { PaginateProblem } from './entities/PaginateProblem';
import { checkIfExists, validator } from 'src/validatior/validator';
import { createProblem, updateProblem } from './validation/problem.validation';

@Resolver(() => Problem)
export class ProblemResolver {
  constructor(private readonly problemService: ProblemService) {}

  @Mutation(() => Problem)
  async createProblem(
    @Args('createProblemInput') createProblemInput: CreateProblemInput,
  ) {
    await validator(createProblem)({ data: createProblemInput });
    return this.problemService.create(createProblemInput);
  }

  @Query(() => PaginateProblem, { name: 'problems' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('search', { nullable: true }) serach?: string,
    @Args('item_per_page', { nullable: true }) item_per_page?: number,
  ) {
    const problem = await this.problemService.findAll(
      page,
      item_per_page,
      serach,
    );
    return {
      items: problem.data,
      totalPages: problem.totalPages,
      page: problem.page,
      item_per_page: problem.item_per_page,
    };
  }

  @Query(() => Problem, { name: 'problem' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'problem' });
    return this.problemService.findOne(id);
  }

  @Mutation(() => Problem)
  async updateProblem(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProblemInput') updateProblemInput: UpdateProblemInput,
  ) {
    await validator(updateProblem)({
      data: updateProblemInput,
      modelName: 'problem',
      id: id,
    });
    return this.problemService.update(id, updateProblemInput);
  }

  @Mutation(() => Problem)
  async removeProblem(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'problem' });
    return this.problemService.remove(id);
  }
}
