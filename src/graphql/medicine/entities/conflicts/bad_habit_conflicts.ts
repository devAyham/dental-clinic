import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class badHabitConflict {
  @Field(() => [String], { description: 'id field ' })
  conflict_in_chemicals: string[];

  @Field(() => String, { description: 'name field ' })
  medicant_name: string;


}
