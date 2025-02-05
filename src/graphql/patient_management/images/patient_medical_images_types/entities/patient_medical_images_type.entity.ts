import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PatientMedicalImage } from '../../patient_medical_images/entities/patient_medical_image.entity';

@ObjectType()
export class PatientMedicalImagesType {
  @Field(() => Int)
  id: number

  @Field(() => String)
  name: string

  @Field(() => [PatientMedicalImage], { nullable: true })
  PatientMedicalImage: PatientMedicalImage[]
}
