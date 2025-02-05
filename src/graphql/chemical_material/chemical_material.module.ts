import { Module } from '@nestjs/common';
import { ChemicalMaterialService } from './chemical_material.service';
import { ChemicalMaterialResolver } from './chemical_material.resolver';

@Module({
  providers: [ChemicalMaterialResolver, ChemicalMaterialService]
})
export class ChemicalMaterialModule {}
