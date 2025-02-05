import { CreateWorkingHourInput } from './create-working_hour.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkingHourInput extends PartialType(CreateWorkingHourInput) {
  @Field(() => Int)
  id: number;
}
