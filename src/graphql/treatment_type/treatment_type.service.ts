import { Injectable } from '@nestjs/common';
import { CreateTreatmentTypeInput } from './dto/create-treatment_type.input';
import { UpdateTreatmentTypeInput } from './dto/update-treatment_type.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { GraphQLError } from 'graphql';

@Injectable()
export class TreatmentTypeService {
  constructor(private prisma: PrismaService){}
   async create(createTreatmentTypeInput: CreateTreatmentTypeInput) {
    return await this.prisma.treatmentType.create({
      data:{name : createTreatmentTypeInput.name},
    });
  }

  async findAll() {
    return await this.prisma.treatmentType.findMany();
  }

  async findOne(id: number) {
    const treatmentType = await this.prisma.treatmentType.findUnique({
      where: {id: id},
    }) 
    return  treatmentType;
  }

  async update(id: number, updateTreatmentTypeInput: UpdateTreatmentTypeInput) {
    return await this.prisma.treatmentType.update({
      where:{id:id},
      data:{name:updateTreatmentTypeInput.name}
    });
  }

  async remove(id: number) {
    return await this.prisma.treatmentType.delete({
      where:{id:id},
    });
  }
}
