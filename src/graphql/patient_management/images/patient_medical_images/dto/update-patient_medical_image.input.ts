import { CreatePatientMedicalImageInput } from './create-patient_medical_image.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientMedicalImageInput extends PartialType(CreatePatientMedicalImageInput) {
  @Field(() => Int)
  id: number;
}
