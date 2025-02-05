import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChemicalMaterialInput {
  
  @Field(() => String, { description: 'Chemical Material Name ' })
  name: string;

  @Field(() => [Int], { nullable: true,description: 'chemical_material_id field ' })
  chemical_material_id?:[number] 

}

