import { Injectable } from '@nestjs/common';
import { CreatePatientCostInput } from './dto/create-patient_cost.input';
import { UpdatePatientCostInput } from './dto/update-patient_cost.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client';
import { PatientCostSortInput } from './dto/sort-input';

@Injectable()
export class PatientCostsService {
  constructor(private prisma: PrismaService) { }

  async create(createPatientCostInput: CreatePatientCostInput) {
    return this.prisma.patientCost.create({
      data: { ...createPatientCostInput },
      include: { treatment: true }
    });
  }

  async findAll({ patient_id, sort, item_per_page, page }: {
    patient_id?: number, sort?: PatientCostSortInput, page?: number, item_per_page?: number
  }) {
    const { field, order } = sort ?? {}
    const data = await PaginatorService<Prisma.PatientCostFindManyArgs>({
      Modal: this.prisma.patientCost
      , page, item_per_page,
      relations: {
        where: {
          patient_id
        },
        orderBy: {
          [field]: order
        },
        include: { treatment: true }
      }
    })
    const { _sum } = await this.prisma.patientCost.aggregate({
      _sum: {
        amount: true
      }
    })
    return {
      ...data,
      items: data.data,
      meta: {
        total: _sum.amount
      }
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} patientCost`;
  // }

  async update(id: number, updatePatientCostInput: UpdatePatientCostInput) {
    return this.prisma.patientCost.update({
      where: { id },
      data: { ...updatePatientCostInput },
      include: { treatment: true }

    });
  }

  remove(id: number) {
    return this.prisma.patientCost.delete({
      where: { id }
    });
  }
}
