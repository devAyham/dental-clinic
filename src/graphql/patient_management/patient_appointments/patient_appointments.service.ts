import { Injectable } from '@nestjs/common';
import { CreatePatientAppointmentInput } from './dto/create-patient_appointment.input';
import { UpdatePatientAppointmentInput } from './dto/update-patient_appointment.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientAppointmentsService {
  constructor(private prisma: PrismaService) { }
  async create(createPatientAppointmentInput: CreatePatientAppointmentInput) {
    return await this.prisma.patientAppointment.create({
      data: {
        ...createPatientAppointmentInput,
        state: 'unregisterd'
      }
    });
  }

  findAll({ date }: { date?: Date }) {
    if (isNaN(date?.getTime()) && date) {
      throw new Error('Invalid date');
    }
    const startDate = new Date(date?.getFullYear(), date?.getMonth(), date?.getDate());
    const endDate = new Date(date?.getFullYear(), date?.getMonth(), date?.getDate() + 1);

    return this.prisma.patientAppointment.findMany({
      where: {
        date: !!date?.getTime() ? {
          gte: startDate.toISOString(),
          lt: endDate.toISOString(),
        } : undefined
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.patientAppointment.findUnique({
      where: { id }
    });
  }

  async update(id: number, updatePatientAppointmentInput: UpdatePatientAppointmentInput) {
    return await this.prisma.patientAppointment.update({
      where: { id },
      data: {
        ...updatePatientAppointmentInput
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.patientAppointment.delete({
      where: { id }
    });
  }
}
