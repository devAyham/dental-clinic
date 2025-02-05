import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Category } from 'src/graphql/category/entities/category.entity';
import { MedicineChemicalMaterials } from './medicine-chemical.entity';

@ObjectType()
export class Medicine {
  @Field(() => Int, { description: 'id field ' })
  id: number;

  @Field(() => String, { description: 'name field ' })
  name: string;

  @Field(() => Float, { description: 'concentration field ' })
  concentration: number;

  @Field(() => [MedicineChemicalMaterials], { description: 'Problem_type', nullable: true })
  medicineChemicalMaterials?: MedicineChemicalMaterials[];

  @Field(() => Int, { description: 'chemical_material_id field ' })
  category_id: number

  @Field(() => Category, { description: 'category', nullable: true })
  category?: Category;
}
