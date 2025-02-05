import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DiseaseChemicalMaterials } from './disease-chemical.entity';

@ObjectType()
export class Disease {

  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [DiseaseChemicalMaterials], { nullable: true })
  diseaseChemicalMaterials?: DiseaseChemicalMaterials[];
}
