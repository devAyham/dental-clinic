import { CreateChemicalMaterialInput } from './create-chemical_material.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChemicalMaterialInput extends PartialType(CreateChemicalMaterialInput) {

  @Field(() => String, { description: 'Chemical Material',nullable:true })
  name?: string;

  @Field(() => [Int], { description: 'chemical_material_id field ' ,nullable:true})
  chemical_material_id?:[number] 
}
