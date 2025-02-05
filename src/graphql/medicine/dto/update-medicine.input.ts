import { CreateMedicineInput } from './create-medicine.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
 
@InputType()
export class UpdateMedicineInput extends PartialType(CreateMedicineInput) {

  @Field(() => String, { description: 'name field ' })
  name: string;

  @Field(() => Int, { description: 'concentration field ' })
  concentration: number;

  @Field(() => [Int], { description: 'chemical_material_id field ' })
  chemical_material_id:[number] 

  @Field(() => Int, { description: 'chemical_material_id field ' })
  category_id:number 
}
