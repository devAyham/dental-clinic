import { Injectable } from '@nestjs/common';
import { CreatePatientPaymentInput } from './dto/create-patient_payment.input';
import { UpdatePatientPaymentInput } from './dto/update-patient_payment.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PateintPaymentSortInput } from './dto/sort-input';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client'
@Injectable()
export class PatientPaymentsService {
  constructor(private prisma: PrismaService) { }
  async create(createPatientPaymentInput: CreatePatientPaymentInput) {
    return this.prisma.patientPayment.create({
      data: { ...createPatientPaymentInput }
    });
  }

  async findAll({ patient_id, sort, item_per_page, page }: {
    patient_id?: number, sort?: PateintPaymentSortInput, page?: number, item_per_page?: number
  }) {
    const { field, order } = sort ?? {}
    const data = await PaginatorService<Prisma.PatientPaymentFindManyArgs>({
      Modal: this.prisma.patientPayment
      , page, item_per_page,
      relations: {
        where: {
          patient_id
        },
        orderBy: {
          [field]: order
        },
      }
    })
    const { _sum } = await this.prisma.patientPayment.aggregate({
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

  // async findOne(id: number) {
  //   return `This action returns a #${id} patientPayment`;
  // }

  async update(id: number, updatePatientPaymentInput: UpdatePatientPaymentInput) {
    return this.prisma.patientPayment.update({
      where: { id },
      data: { ...updatePatientPaymentInput }
    });
  }

  async remove(id: number) {
    return this.prisma.patientPayment.delete({
      where: { id }
    });
  }
}
