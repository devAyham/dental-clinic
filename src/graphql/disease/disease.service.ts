import { Injectable } from '@nestjs/common';
import { CreateDiseaseInput } from './dto/create-disease.input';
import { UpdateDiseaseInput } from './dto/update-disease.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client';

@Injectable()
export class DiseaseService {
  constructor(private prisma: PrismaService) {}

  async create({ name, chemical_material_id }: CreateDiseaseInput) {
    const disease = await this.prisma.disease.create({
      data: { name: name },
    });
    //attach data chemical_material_id and disease id in pivot table
    await this.prisma.diseaseChemicalMaterial.createMany({
      data: chemical_material_id.map((id) => ({
        disease_id: disease.id,
        chemical_material_id: id,
      })),
    });
    return disease;
  }

  async findAll(page: any, item_per_page: any, search?: string) {
    return await PaginatorService<Prisma.DiseaseFindManyArgs>({
      Modal: this.prisma.disease,
      item_per_page,
      page,
      search,
      relations: {
        include: {
          diseaseChemicalMaterials:{
            include:{

              chemical_material:true 
            }
          }
          },
        },
    });
  }

  async findOne(id: number) {
    const disease = await this.prisma.disease.findUnique({
      where: { id: id },
    });
    return disease;
  }

  async update(id: number, { name, chemical_material_id }: UpdateDiseaseInput) {
    await this.prisma.diseaseChemicalMaterial.deleteMany({
      where: { disease_id: id },
    });

    const updatedisease = await this.prisma.disease.update({
      where: { id: id },
      data: { name: name },
    });
    //attach data chemical_material_id and badhabit id in pivot table
    await this.prisma.diseaseChemicalMaterial.createMany({
      data: chemical_material_id.map((id) => ({
        disease_id: updatedisease.id,
        chemical_material_id: id,
      })),
    });
    return updatedisease;
  }

  async remove(id: number) {
    return await this.prisma.disease.delete({
      where: { id: id },
    });
  }
}
