import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MedicineChemicalMaterials } from 'src/graphql/medicine/entities/medicine-chemical.entity';
import { BadHabitChemicalMaterials } from './bad_bad-chemical.entity';

@ObjectType()
export class BadHabit {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [BadHabitChemicalMaterials], { nullable: true })
  badHabitChemicalMaterials?: BadHabitChemicalMaterials[];
}
