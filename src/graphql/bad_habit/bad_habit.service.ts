import { Injectable } from '@nestjs/common';
import { CreateBadHabitInput } from './dto/create-bad_habit.input';
import { UpdateBadHabitInput } from './dto/update-bad_habit.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client';

@Injectable()
export class BadHabitService {
  constructor(private prisma: PrismaService) { }

  async create({name,chemical_material_id}: CreateBadHabitInput) {
    const bad_habit = await this.prisma.badHabit.create({
      data: { name: name },
    });
      //attach data chemical_material_id and badhabit id in pivot table
      await this.prisma.badHabitChemicalMaterial.createMany({
        data: chemical_material_id.map((id) => ({
          bad_habit_id: bad_habit.id,
          chemical_material_id: id,
        })),
      });
    return bad_habit;
  }

  async findAll(page: any, item_per_page: any, search?: string) {
    return await PaginatorService<Prisma.BadHabitFindManyArgs>({
      Modal: this.prisma.badHabit,
      item_per_page,
      page,
      search,
      relations: {
        include: {
          badHabitChemicalMaterials:{
            include:{
              chemical_material:true 
            }
          }
          },
        },
      // },
    });
  }

  async findOne(id: number) {
    const badhabit = await this.prisma.badHabit.findUnique({
      where: {id: id},
    }) 
    return  badhabit;
  }

  async update(id: number, { name ,chemical_material_id }: UpdateBadHabitInput) {

    await this.prisma.badHabitChemicalMaterial.deleteMany({
      where: { bad_habit_id: id },
    });

    const updateBadhabit = await this.prisma.badHabit.update({
      where: { id: id },
      data: { name: name },
    });
      //attach data chemical_material_id and badhabit id in pivot table
      await this.prisma.badHabitChemicalMaterial.createMany({
        data: chemical_material_id.map((id) => ({
          bad_habit_id: updateBadhabit.id,
          chemical_material_id: id,
        })),
      });
    return updateBadhabit;
  }


  async remove(id: number) {
    return await this.prisma.badHabit.delete({
      where: { id: id },
    });
  }
}
