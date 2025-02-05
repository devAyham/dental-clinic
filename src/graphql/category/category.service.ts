import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryInput: CreateCategoryInput) {
    return this.prisma.category.create({
      data: {
        name: createCategoryInput.name,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
}
