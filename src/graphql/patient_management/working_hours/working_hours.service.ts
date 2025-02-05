import { Injectable } from '@nestjs/common';
import { CreateWorkingHourInput } from './dto/create-working_hour.input';
import { UpdateWorkingHourInput } from './dto/update-one-working_hour.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Days } from '@prisma/client';
import { UpdateAllWorkingHourInput } from './dto/update-all-working_hour.input';

@Injectable()
export class WorkingHoursService {
  constructor(private prisma: PrismaService) { }
  async create(createWorkingHourInput: CreateWorkingHourInput) {
    return await this.prisma.workingHours.create({
      data: createWorkingHourInput
    });
  }

  async findAll() {
    return await this.prisma.workingHours.findMany();
  }

  async findOne({ id, day }: {
    id?: number, day?: Days
  }) {
    return await this.prisma.workingHours.findUnique({
      where: {
        id, day
      }
    });
  }

  async updateOne(id: number, updateWorkingHourInput: UpdateWorkingHourInput) {
    return await this.prisma.workingHours.update({
      data: {
        ...updateWorkingHourInput,
        open: true // no validation for days from reservations
      },
      where: { id }
    });
  }

  async updateAll(updateWorkingHourInput: UpdateAllWorkingHourInput) {
    if (updateWorkingHourInput.open === false) {
      const reservation = await this.prisma.patientReservation.count()
      if (reservation > 0) {
        throw new Error(`You can not close the reservations becaue you have request on hold ...
        please accept or reject all to be able to close the reservations requests`);
      }
    }
    await this.prisma.workingHours.updateMany({
      data: {
        ...updateWorkingHourInput,
      },
    });
    return await this.prisma.workingHours.findMany()
  }
  async remove(id: number) {
    return await this.prisma.workingHours.delete({
      where: { id }
    });
  }
}
