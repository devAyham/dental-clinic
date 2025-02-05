import { CreateTreatmentInput } from './create-treatment.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';
import { UpdateStepInput } from './update-steps.input';

@InputType()
export class UpdateTreatmentInput extends PartialType(CreateTreatmentInput) {
  @Field(() => String)
  name: string;

  @Field(()=> Float)
  price:number;

  @Field(()=> String , { nullable: true })
  color:string;

  @Field(()=> Int)
  treatment_type_id:number;

  @Field(() => [UpdateStepInput], { nullable: true })
  steps?: UpdateStepInput[];
}
