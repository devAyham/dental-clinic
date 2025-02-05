import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { CreateStepInput } from './create-steps.input';
import { CreateSubStepInput } from './create-sub-steps.input';

@InputType()
export class CreateTreatmentInput {
  @Field(() => String)
  name: string;

  @Field(()=> Float)
  price:number;

  @Field(()=> String)
  color:string;

  @Field(()=> Int)
  treatment_type_id:number;

  @Field(() => [CreateStepInput], { nullable: true })
  steps?: CreateStepInput[];
}
