import { Injectable } from '@nestjs/common';
import { CreateChemicalMaterialInput } from './dto/create-chemical_material.input';
import { UpdateChemicalMaterialInput } from './dto/update-chemical_material.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client';
@Injectable()
export class ChemicalMaterialService {
  constructor(private prisma: PrismaService) {}

  async create({ name, chemical_material_id }: CreateChemicalMaterialInput) {
    const newChemicalMaterial = await this.prisma.chemicalMaterial.create({
      data: { name },
    });

    //attach data chemical_material_id and medicine_id in pivot table
    if (chemical_material_id) {
    
      // REVIEW this loop on conflicts may be useless re REVIEW this section 
      // remove ids that already have conflicts with newChemical  like if i send to create conflicts between {3,1}   and in DB i have {1,3} in this case i remove 3 from conflicts array ]
      const conflictsArray = [];
      for (const id of chemical_material_id) {
        let conflictsExists =
          await this.prisma.chemicalChemicalMaterial.findFirst({
            where: {
              OR: [
                {
                  chemical_material_1_id: newChemicalMaterial.id,
                  chemical_material_2_id: id,
                },
                {
                  chemical_material_1_id: id,
                  chemical_material_2_id: newChemicalMaterial.id,
                },
              ],
            },
          });
        if (!conflictsExists) {
          conflictsArray.push(id);
        }
      }

      await this.prisma.chemicalChemicalMaterial.createMany({
        data: conflictsArray.map((id) => ({
          chemical_material_1_id: newChemicalMaterial.id,
          chemical_material_2_id: id,
        })),
        skipDuplicates: true,
      });
    }
    return newChemicalMaterial;
  }

  async findAll(page: any, item_per_page: any, search?: string) {
    return await PaginatorService<Prisma.DiseaseFindManyArgs>({
      Modal: this.prisma.chemicalMaterial,
      item_per_page,
      page,
      search,
      // relations:{
        // include:{
            // diseaseChemicalMajterials:true
        // }
      // }
    });
  }

  async findOne(id: number) {
    const data = await this.prisma.chemicalMaterial.findUnique({
      where: { id },
      include: {
        chemicalChemicalMaterials1: {
          include: {
            chemical_material_2: true,
          },
        },
        chemicalChemicalMaterials2: {
          include: {
            chemical_material_1: true,
          },
        },
      },
    });

    // Extract the conflicts values from the response and add them to the array
    const conflicts = []
      .concat(
        data?.chemicalChemicalMaterials1
          ?.map((data) => data.chemical_material_2)
          .filter(Boolean) || [],
      )
      .concat(
        data?.chemicalChemicalMaterials2
          ?.map((data) => data.chemical_material_1)
          .filter(Boolean) || [],
      );

    return { ...data, conflicts };
  }

  async update(
    id: number,
    { name, chemical_material_id }: UpdateChemicalMaterialInput,
  ) {
    await this.prisma.chemicalChemicalMaterial.deleteMany({
      where: {
        OR: [{ chemical_material_1_id: id }, { chemical_material_2_id: id }],
      },
    });

    const updatedChemicalMaterial = await this.prisma.chemicalMaterial.update({
      where: { id: id },
      data: { name: name },
    });

    if (chemical_material_id) {
      //attach data chemical_material_id and medicine_id in pivot table
      await this.prisma.chemicalChemicalMaterial.createMany({
        data: chemical_material_id.map((id) => ({
          chemical_material_1_id: updatedChemicalMaterial.id,
          chemical_material_2_id: id,
        })),
        skipDuplicates: true,
      });
    }
    return updatedChemicalMaterial;
  }
  async remove(id: number) {
    return await this.prisma.chemicalMaterial.delete({ where: { id: id } });
  }
}
