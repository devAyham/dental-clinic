import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDiseaseInput {
  @Field(() => String)
  name: string;

  @Field(()=> [Int] , {nullable:true})
  chemical_material_id?:[number]
}
