import { CreateWorkingHourInput } from './create-working_hour.input';
import { InputType, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateAllWorkingHourInput extends PartialType(OmitType(CreateWorkingHourInput, ['day'])) {
}
