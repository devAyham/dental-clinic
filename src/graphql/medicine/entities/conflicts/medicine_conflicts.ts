import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class medicineConflicts {
  @Field(() => [String], { description: 'id field ' })
  message: string[];

  @Field(() => String, { description: 'name field ' })
  pair_of_medicine: string;


}
