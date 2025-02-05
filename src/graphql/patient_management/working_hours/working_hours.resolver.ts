import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkingHoursService } from './working_hours.service';
import { WorkingHour } from './entities/working_hour.entity';
import { CreateWorkingHourInput } from './dto/create-working_hour.input';
import { UpdateWorkingHourInput } from './dto/update-one-working_hour.input';
import { Days } from '@prisma/client';
import { UpdateAllWorkingHourInput } from './dto/update-all-working_hour.input';

@Resolver(() => WorkingHour)
export class WorkingHoursResolver {
  constructor(private readonly workingHoursService: WorkingHoursService) { }

  @Mutation(() => WorkingHour)
  createWorkingHour(@Args('createWorkingHourInput') createWorkingHourInput: CreateWorkingHourInput) {
    return this.workingHoursService.create(createWorkingHourInput);
  }

  @Query(() => [WorkingHour], { name: 'workingHours' })
  findAll() {
    return this.workingHoursService.findAll();
  }

  @Query(() => WorkingHour, { name: 'workingHour' })
  findOne(@Args('id', { type: () => Int }) id: number, @Args('day', { type: () => Days }) day: Days) {
    return this.workingHoursService.findOne({ day, id });
  }

  @Mutation(() => WorkingHour)
  updateOneWorkingHour(@Args('updateOneWorkingHour') updateWorkingHourInput: UpdateWorkingHourInput) {
    return this.workingHoursService.updateOne(updateWorkingHourInput.id, updateWorkingHourInput);
  }

  @Mutation(() => [WorkingHour])
  updateAllWorkingHour(@Args('updateAllWorkingHour') updateWorkingHourInput: UpdateAllWorkingHourInput) {
    return this.workingHoursService.updateAll(updateWorkingHourInput);
  }


  @Mutation(() => WorkingHour)
  removeWorkingHour(@Args('id', { type: () => Int }) id: number) {
    return this.workingHoursService.remove(id);
  }
}
