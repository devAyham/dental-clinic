import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBadHabitInput {
  @Field(() => String)
  name: string;

  @Field(()=> [Int] , {nullable:true})
  chemical_material_id?:[number]

}
