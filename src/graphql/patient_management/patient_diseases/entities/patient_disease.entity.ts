import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Disease } from 'src/graphql/disease/entities/disease.entity';

@ObjectType()
export class PatientDisease {
  @Field(() => Int)
  id: number

  @Field(() => Int)
  disease_id: number

  @Field(() => Int)
  patient_id: number

  @Field(() => Boolean)
  tight: boolean;

  @Field(() => String, { nullable: true })
  notes?: string

  @Field(() => Date, { nullable: true })
  start_date?: Date

  @Field(() => Disease)
  disease: Disease

}
