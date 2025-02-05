import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateMedicineInput {
  @Field(() => String, { description: 'name field ' })
  name: string;

  @Field(() => Float, { description: 'concentration field ' })
  concentration: number;

  @Field(() => [Int], { description: 'chemical_material_id field ' })
  chemical_material_id: [number];

  @Field(() => Int)
  category_id: number;


}
