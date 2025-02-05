import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Gender } from '@prisma/client';
import { CreatePatientBadHabitInput } from '../../patient_bad-habits/dto/create-patient_bad-habit.input';
import { CreatePatientMedicineInput } from '../../patient_medicines/dto/create-patient_medicine.input';
import { CreatePatientDiseaseInput } from '../../patient_diseases/dto/create-patient-disease.input';


registerEnumType(Gender, {
  name: 'Gender'
});


@InputType()
export class CreatePatientInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  // @Transform(value => {
  //   if (typeof value === 'string') {
  //     return value as Gender;
  //   }
  //   return value;
  // })
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

  @Field(() => [CreatePatientDiseaseInput], { nullable: true })
  patient_diseases?: CreatePatientDiseaseInput[]

  @Field(() => [CreatePatientBadHabitInput], { nullable: true })
  patient_badHabits?: CreatePatientBadHabitInput[]

  @Field(() => [CreatePatientMedicineInput], { nullable: true })
  patient_medicines?: CreatePatientMedicineInput[]

}
