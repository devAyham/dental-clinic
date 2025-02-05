import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BadHabitService } from './bad_habit.service';
import { BadHabit } from './entities/bad_habit.entity';
import { CreateBadHabitInput } from './dto/create-bad_habit.input';
import { UpdateBadHabitInput } from './dto/update-bad_habit.input';
import { Paginatebadhabit } from './entities/Paginatebadhabit';
import { checkIfExists, validator } from '../../validatior/validator';
import { createBadHabit, updateBadHabit } from './validation/badhabit.validation';
import { error } from 'console';

@Resolver(() => BadHabit)
export class BadHabitResolver {
  constructor(private readonly badHabitService: BadHabitService) {}

  @Mutation(() => BadHabit)
  async createBadHabit(@Args('createBadHabitInput') createBadHabitInput: CreateBadHabitInput
  ){
    await validator(createBadHabit)({ data: createBadHabitInput });
    return this.badHabitService.create(createBadHabitInput);
  }

  @Query(() =>Paginatebadhabit, { name: 'badHabits' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('search', { nullable: true }) serach?: string,
    @Args('item_per_page', { nullable: true }) item_per_page?: number,
  ) {
    const badHabit = await this.badHabitService.findAll(
      page,
      item_per_page,
      serach,
    );
    return {
      items: badHabit.data,
      totalPages: badHabit.totalPages,
      page: badHabit.page,
      item_per_page: badHabit.item_per_page,
    };
  }

  @Query(() => BadHabit, { name: 'badHabit' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'badHabit' });
    return this.badHabitService.findOne(id);
  }

  @Mutation(() => BadHabit)
  async updateBadHabit(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateBadHabitInput') updateBadHabitInput: UpdateBadHabitInput,
    ) {
      await validator(updateBadHabit)({
        data: updateBadHabitInput,
        modelName: 'badHabit',
        id: id,
      });
    return this.badHabitService.update(id,updateBadHabitInput);
  }

  @Mutation(() => BadHabit)
  async removeBadHabit(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'badHabit' });
    return this.badHabitService.remove(id);
  }
}
