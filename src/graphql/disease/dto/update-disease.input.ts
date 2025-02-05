import { CreateDiseaseInput } from './create-disease.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDiseaseInput extends PartialType(CreateDiseaseInput) {
  @Field(() => String)
  name: string;

  @Field(()=> [Int] , {nullable:true})
  chemical_material_id?:[number]
}
