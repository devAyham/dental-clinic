import { Injectable } from '@nestjs/common';
import { CreateLabOrderInput } from './dto/create-lab_order.input';
import { UpdateLabOrderInput } from './dto/update-lab_order.input';
import { PrismaService } from '../../prisma/prisma.service';
import { GraphQLError } from 'graphql';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client';

@Injectable()
export class LabOrderService {
  constructor(private prisma: PrismaService) {}

  async create({ lab_id,  steps_names ,...rest}: CreateLabOrderInput) {
    const labOrder = await this.prisma.labOrder.create({
      data: {
        ...rest,
        lab: {
          connect: {
            id: lab_id,
          },
        },
      },
      include: {
        lab: true,
      },
    });

    for (let i = 0; i < steps_names.length; i++) {
      const name = steps_names[i];

      await this.prisma.labOrderStep.create({
        data: {
          lab_order_id: labOrder.id,

          name: name,
        },
      });
    }
    return labOrder;
  }

  async findAll(page: any, item_per_page: any, search?: string, lab_id?:number) {
    return await PaginatorService<Prisma.LabOrderFindManyArgs>({
      Modal: this.prisma.labOrder,
      item_per_page,
      page,
      search,
      relations: {
        where:{
          lab_id
        },
        include: {
          lab: true,
          LabOrderStep: true,
        },
      },
    });
  }
  async findOne(id: number) {
    return await this.prisma.labOrder.findUnique({
      where: { id },
      include: {
        lab: true,
        LabOrderStep: true,
      },
    });
  }

  async update(id: number, { lab_id, name, steps_names }: UpdateLabOrderInput) {
    await this.prisma.labOrderStep.deleteMany({
      where: {
        lab_order_id: id,
      },
    });

    const labOrder = await this.prisma.labOrder.update({
      where: { id },
      data: {
        name,
      },
    });

    for (let i = 0; i < steps_names.length; i++) {
      const name = steps_names[i];

      await this.prisma.labOrderStep.create({
        data: {
          lab_order_id: labOrder.id,
          name: name,
        },
      });
    }
    return labOrder;
  }

  async remove(id: number) {
    return await this.prisma.labOrder.delete({
      where: { id },
    });
  }
}
