import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BadHabit } from 'src/graphql/bad_habit/entities/bad_habit.entity';

@ObjectType()
export class PatientBadHabit {
  @Field(() => Int)
  id: number

  @Field(() => Int)
  patient_id: number

  @Field(() => Int)
  bad_habet_id: number

  @Field(() => String, { nullable: true })
  notes?: string

  @Field(() => Date, { nullable: true })
  start_date?: Date

  @Field(() => BadHabit)
  bad_habet: BadHabit
}
