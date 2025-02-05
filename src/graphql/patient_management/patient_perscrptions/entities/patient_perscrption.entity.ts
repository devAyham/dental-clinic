import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PatientPerscrptionsMedicien } from '../../patient_perscrptions_mediciens/entities/patient_perscrptions_medicien.entity';
import { Medicine } from 'src/graphql/medicine/entities/medicine.entity';

@ObjectType()
export class PatientPerscrption {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  patient_session_id: number;

  @Field(() => Int)
  patient_perscrption_id: number;

  @Field(() => [PatientPerscrptionsMedicien])
  PatientPerscrptionsMedicince: PatientPerscrptionsMedicien[];

  @Field(() => [Medicine])
  Medicine: Medicine[];
}
