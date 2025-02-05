import { Injectable } from '@nestjs/common';
import { CreatePatientAppointmentInput } from './dto/create-patient_appointment.input';
import { UpdatePatientAppointmentInput } from './dto/update-patient_appointment.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientAppointmentsService {
  constructor(private prisma: PrismaService) { }
  async create({ date, reservation_id, type, ...restInputs }: CreatePatientAppointmentInput) {
    if (date < new Date(Date.now())) {
      throw new Error('Date must greater than now date');
    }
    if (type === 'external' && !reservation_id) {
      throw new Error('reservation_id required on external appointment type');

    }
    return await this.prisma.patientAppointment.create({
      data: {
        ...restInputs,
        date,
        type,
        state: 'unregisterd'
      },
      include: { patient: true }
    }).then(async (data) => {
      if (type === 'external' && reservation_id) {
        await this.prisma.patientReservation.delete({
          where: { id: reservation_id }
        })
      }
      return data
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
      },
      include: { patient: true }
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
