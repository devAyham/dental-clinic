import { CreatePatientSessionInput } from './create-patient_session.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientSessionInput extends PartialType(CreatePatientSessionInput) {
  @Field(() => Int)
  id: number;
}
