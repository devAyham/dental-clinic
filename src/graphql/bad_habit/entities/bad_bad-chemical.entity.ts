import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Category } from 'src/graphql/category/entities/category.entity';
import { ChemicalMaterial } from 'src/graphql/chemical_material/entities/chemical_material.entity';

@ObjectType()
export class BadHabitChemicalMaterials {
  @Field(() => Int, { description: 'id field ' })
  id: number;


  @Field(() => Int, { description: 'concentration field ' })
  chemical_material_id: number;

  @Field(() => ChemicalMaterial, { description: 'chemical_material' ,nullable:true})
  chemical_material?: ChemicalMaterial;

  @Field(() => Int, { description: 'chemical_material_id field ' })
  bad_habit_id:number 


}
