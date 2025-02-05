import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gender } from '@prisma/client';
import { PatientDisease } from '../../patient_diseases/entities/patient_disease.entity';
import { PatientBadHabit } from '../../patient_bad-habits/entities/patient_bad-habit.entity';
import { PatientMedicine } from '../../patient_medicines/entities/patient_medicine.entity';
import { PatientTeethTreatment } from '../../patient_teeth_treatments/entities/patient_teeth_treatment.entity';
import { PatientPayment } from '../../patient_payments/entities/patient_payment.entity';
import { PatientCost } from '../../patient_costs/entities/patient_cost.entity';
import { PatientDiagnosis } from '../../patient_diagnoses/entities/patient_diagnosis.entity';

@ObjectType()
export class Patient {
  @Field(() => Int)
  id: number

  @Field(() => String)
  name: string

  @Field(() => Gender)
  gender: Gender

  @Field(() => String)
  phone: string

  @Field(() => String, { nullable: true })
  birth_date?: string

  @Field(() => String, { nullable: true })
  job?: string

  @Field(() => String, { nullable: true })
  address?: string

  @Field(() => String, { nullable: true })
  main_complaint?: string

  @Field(() => String, { nullable: true })
  maintal_status?: string

  @Field(() => [PatientDisease], { nullable: true })
  PatientDisease?: PatientDisease[]

  @Field(() => [PatientBadHabit], { nullable: true })
  PatientBadHabet?: PatientBadHabit[]

  @Field(() => [PatientMedicine], { nullable: true })
  PatientMedicine?: PatientMedicine[]

  @Field(() => [PatientTeethTreatment], { nullable: true })
  PatientTeethTreatment?: PatientTeethTreatment[]

  @Field(() => [PatientPayment], { nullable: true })
  PatientPayment?: PatientPayment[]

  @Field(() => [PatientCost], { nullable: true })
  PatientCost?: PatientCost[]

  @Field(() => [PatientDiagnosis], { nullable: true })
  PatientDiagnose?: PatientDiagnosis[]
}
