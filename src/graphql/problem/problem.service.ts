import { Injectable } from '@nestjs/common';
import { CreateProblemInput } from './dto/create-problem.input';
import { UpdateProblemInput } from './dto/update-problem.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { GraphQLError } from 'graphql';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProblemService {
  constructor(private prisma: PrismaService) { }

  async create({ name, problem_type_id }: CreateProblemInput) {
    //create new problem
    return await this.prisma.problem.create({
      data: {
        name: name,
        Problem_type: {
          connect: {
            id: problem_type_id,
          },
        },
      },
      include: {
        Problem_type: true
      }
    });
  }

  async findAll(page: any, item_per_page: any, search?: string) {
    return await PaginatorService<Prisma.ProblemFindManyArgs>({
      Modal: this.prisma.problem,
      item_per_page,
      page,
      search,
      relations: {
        include: {
          Problem_type: true
        }
      }
    });
  }

  async findOne(id: number) {
    const problem = await this.prisma.problem.findUnique({
      where: { id: id },
      include: {
        Problem_type: true,
      }
    })
    return problem;
  }

  async update(id: number, updateProblemInput: UpdateProblemInput) {
    return await this.prisma.problem.update({
      where: { id: id },
      data: {
        name: updateProblemInput.name,
        problem_type_id: updateProblemInput.problem_type_id
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.problem.delete({
      where: { id: id },
      include: {
        Problem_type: true,
      }
    });
  }
}
