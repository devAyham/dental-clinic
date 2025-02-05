import { InputType, Field, Int } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/images_uploader/interfaces/IFileUpload';

@InputType()
export class CreatePatientMedicalImageInput {
  // @Field(() => String)
  // src: string;

  @Field(() => String)
  title: string

  @Field(() => Int)
  patient_id: number;

  @Field(() => Int)
  medical_image_type_id: number;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
