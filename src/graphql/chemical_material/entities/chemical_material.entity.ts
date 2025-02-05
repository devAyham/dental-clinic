import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ConflictChemicalMaterial } from './conflict-chemical-material';

@ObjectType()
export class ChemicalMaterial {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  
  @Field(() => [ConflictChemicalMaterial], { description: 'conflicts of ConflictChemicalMaterial field ' ,nullable:true })
  conflicts?: ConflictChemicalMaterial[];
}