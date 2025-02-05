import { Injectable } from '@nestjs/common';
import { CreateLabInput } from './dto/create-lab.input';
import { UpdateLabInput } from './dto/update-lab.input';

import { PrismaService } from '../../prisma/prisma.service';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client';

@Injectable()
export class LabService {
  constructor(private prisma: PrismaService) {}

  async create(createLabInput: CreateLabInput) {
    const lab = await this.prisma.lab.create({
      data: { ...createLabInput },
    });
    return lab;
  }

  async findAll(page: any, item_per_page: any, search?: string) {
    return await PaginatorService<Prisma.LabFindManyArgs>({
      Modal: this.prisma.lab,
      item_per_page,
      page,
      search,
    });
  }

  async findOne(id: number) {
    return await this.prisma.lab.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateLabInput: UpdateLabInput) {
    var a = await this.prisma.lab.update({
      where: { id },
      data: { ...updateLabInput },
    });
    console.dir(a);
    return a;
  }

  async remove(id: number) {
    return await this.prisma.lab.delete({
      where: { id: id },
    });
  }
}
