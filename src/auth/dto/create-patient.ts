
import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Gender } from '@prisma/client';
import { CreatePatientBadHabitInput } from 'src/graphql/patient_management/patient_bad-habits/dto/create-patient_bad-habit.input';
import { CreatePatientMedicineInput } from 'src/graphql/patient_management/patient_medicines/dto/create-patient_medicine.input'; 
import { CreatePatientDiseaseInput } from 'src/graphql/patient_management/patient_diseases/dto/create-patient-disease.input';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { IsDateString } from 'class-validator';
import { IsDateFormatted } from './isDateFormatted';


registerEnumType(Gender, {
  name: 'Gender'
});


@InputType()
export class CreateUserPatientInput {
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
// 



// @IsDateFormatted()
@Field(() => String,{})
  birth_date: string;


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
