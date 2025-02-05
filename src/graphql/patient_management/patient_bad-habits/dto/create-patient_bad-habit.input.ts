import { InputType, Int, Field } from '@nestjs/graphql';



@InputType()
export class CreatePatientBadHabitInput {
  @Field(() => Int)
  bad_habet_id: number

  @Field(() => String, { nullable: true })
  notes?: string

  @Field(() => Date, { nullable: true })
  start_date?: Date
}