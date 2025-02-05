import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PatientPerscrption } from '../../patient_perscrptions/entities/patient_perscrption.entity';
import { Medicine } from 'src/graphql/medicine/entities/medicine.entity';

@ObjectType()
export class PatientPerscrptionsMedicien {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  patient_perscrption_id: number;

  @Field(() => Int)
  medicince_id: number;

  @Field(() => String)
  qantity: string;

  @Field(() => String)
  repetition: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => PatientPerscrption)
  perscrption: PatientPerscrption;

  @Field(() => Medicine)
  medicince: Medicine;
}
