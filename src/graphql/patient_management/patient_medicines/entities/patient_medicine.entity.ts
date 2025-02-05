import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Medicine } from 'src/graphql/medicine/entities/medicine.entity';

@ObjectType()
export class PatientMedicine {
  @Field(() => Int)
  id: number

  @Field(() => Int)
  patient_id: number

  @Field(() => Int)
  medicine_id: number

  @Field(() => String, { nullable: true })
  notes?: string

  @Field(() => Date, { nullable: true })
  start_date?: Date

  @Field(() => Medicine)
  medicine: Medicine
}
