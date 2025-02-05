import { CreatePatientMedicalImagesTypeInput } from './create-patient_medical_images_type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientMedicalImagesTypeInput extends PartialType(CreatePatientMedicalImagesTypeInput) {
  @Field(() => Int)
  id: number;
}
