import { Injectable } from '@nestjs/common';
import { CreateTreatmentInput } from './dto/create-treatment.input';
import { UpdateTreatmentInput } from './dto/update-treatment.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { GraphQLError } from 'graphql';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client';

@Injectable()
export class TreatmentService {
  constructor(private prisma: PrismaService) { }

  async create(CreateTreatmentInput: CreateTreatmentInput) {
    const treatment = await this.prisma.treatment.create({
      data: {
        name: CreateTreatmentInput.name,
        price: CreateTreatmentInput.price,
        color: CreateTreatmentInput.color,
        treatment_type: {
          connect: {
            id: CreateTreatmentInput.treatment_type_id,
          },
        },
        steps: CreateTreatmentInput.steps
          ? {
            create: CreateTreatmentInput.steps.map((step) => ({
              name: step.name,
              subSteps: step.subSteps
                ? {
                  create: step.subSteps.map((subStep) => ({
                    name: subStep.name,
                  })),
                }
                : undefined, // Set to undefined if subSteps array is not provided
            })),
          }
          : undefined, // Set to undefined if steps array is not provided
      },
      include: {
        steps: {
          include: {
            subSteps: true,
          },
        },
        treatment_type: true,
      },
    });
    return treatment;
  }

  async findAll(page: any, item_per_page: any, search?: string) {
    return await PaginatorService<Prisma.TreatmentFindManyArgs>({
      Modal: this.prisma.treatment,
      item_per_page,
      page,
      search,
      relations: {
        include: {
          steps: {
            include: {
              subSteps: true
            }
          },
          treatment_type: true
        }
      }
    });
  }

  async findOne(id: number) {
    const treatment = await this.prisma.treatment.findUnique({
      where: { id: id },
      include: {
        steps: {
          include: {
            subSteps: true,
          },
        },
        treatment_type: true,
      },
    });

    console.dir(treatment, { depth: null });

    return treatment;
  }

  async update(id: number, updateTreatmentInput: UpdateTreatmentInput) {
    await this.prisma.step.deleteMany({ where: { treatment_id: id } })

    return await this.prisma.treatment.update({
      where: { id: id },
      data: {
        name: updateTreatmentInput.name,
        price: updateTreatmentInput.price,
        color: updateTreatmentInput.color,
        treatment_type: {
          connect: {
            id: updateTreatmentInput.treatment_type_id,
          },
        },
        steps: updateTreatmentInput.steps
          ? {
            create: updateTreatmentInput.steps.map((step) => ({
              name: step.name,
              subSteps: step.subSteps
                ? {
                  create: step.subSteps.map((subStep) => ({
                    name: subStep.name,
                  })),
                }
                : undefined, // Set to undefined if subSteps array is not provided
            })),
          }
          : undefined, // Set to undefined if steps array is not provided
      },
      include: {
        steps: {
          include: {
            subSteps: true,
          },
        },
        treatment_type: true,
      },

    });
  }

  async remove(id: number) {
    return await this.prisma.treatment.delete({
      where: { id: id },
    });
  }
}
