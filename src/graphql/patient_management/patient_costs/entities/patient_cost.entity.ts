import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Patient } from '../../patient/entities/patient.entity';
import { Treatment } from 'src/graphql/treatment/entities/treatment.entity';

@ObjectType()
export class PatientCost {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  amount: number;

  @Field(() => String , { nullable: true })
  description?: string

  @Field(() => Date)
  date: Date

  @Field(() => Int)
  patient_id: number

  @Field(() => Int, { nullable: true })
  treatment_id?: number

  @Field(() => Patient)
  patient: Patient

  @Field(() => Treatment, { nullable: true })
  treatment?: Treatment
}
