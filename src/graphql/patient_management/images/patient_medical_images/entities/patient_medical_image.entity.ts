import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Patient } from 'src/graphql/patient_management/patient/entities/patient.entity';
import { PatientMedicalImagesType } from '../../patient_medical_images_types/entities/patient_medical_images_type.entity';

@ObjectType()
export class PatientMedicalImage {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String)
  src: string;

  @Field(() => String)
  title: string

  @Field(() => Int)
  patient_id: number;

  @Field(() => Int)
  medical_image_type_id: number;

  @Field(() => Date)
  created_at: Date

  @Field(() => Patient)
  patient?: Patient

  @Field(() => PatientMedicalImagesType, { nullable: true })
  imageType?: PatientMedicalImagesType
}
