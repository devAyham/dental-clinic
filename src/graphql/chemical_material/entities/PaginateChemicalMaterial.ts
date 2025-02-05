import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'src/pagination/PaginateResult';
import { ChemicalMaterial } from './chemical_material.entity';


@ObjectType()
export class PaginateChemicalMaterial extends PaginateResult(ChemicalMaterial) {}

