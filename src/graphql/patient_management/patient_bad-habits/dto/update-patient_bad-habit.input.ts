import { CreatePatientBadHabitInput } from './create-patient_bad-habit.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientBadHabitInput extends PartialType(CreatePatientBadHabitInput) {
  @Field(() => Int)
  id: number;
}
