import { Injectable } from '@nestjs/common';
import { CreatePatientReservationInput } from './dto/create-patient_reservation.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Days } from '@prisma/client';
import { UpdatePatientReservationInput } from './dto/update-patient_reservation.input';

@Injectable()
export class PatientReservationsService {
  constructor(private prisma: PrismaService) { }

  async create({ patient_id, date, notes }: CreatePatientReservationInput) {
    const patient_reservations_count = await this.prisma.patientReservation.count({
      where: { patient_id },
    })
    if (date < new Date(Date.now())) {
      throw new Error('Date must greater than now date');
    }
    if (patient_reservations_count > 0) {
      throw new Error('patient can not have more than 1 onHold reservation')
    }
    const day = new Date(date).toLocaleString('en-SY', { weekday: 'short' }) as Days
    const workingHours = await this.prisma.workingHours.findUnique({
      where: {
        day
      }
    })
    const fromH = workingHours.from.getHours();
    const fromM = workingHours.from.getMinutes();
    const dateH = date.getHours();
    const dateM = date.getMinutes();
    const toH = workingHours.to.getHours();
    const toM = workingHours.to.getMinutes();

    const fromTimeValue = Number(fromH) * 3600 + Number(fromM) * 60;
    const dateTimeValue = Number(dateH) * 3600 + Number(dateM) * 60;
    const toTimeValue = Number(toH) * 3600 + Number(toM) * 60;

    if (dateTimeValue < fromTimeValue || dateTimeValue > toTimeValue) {
      throw new Error(`Date must be within working hours range ${workingHours.from.toLocaleTimeString()} => ${workingHours.to.toLocaleTimeString()}`);
    }

    return await this.prisma.patientReservation.create({
      data: {
        date, notes, patient_id,
      },
      include: { patient: true }
    });
  }

  async findAll({ patient_id }: { patient_id?: number }) {
    return await this.prisma.patientReservation.findMany({
      where: { patient_id },
      include:{
        patient:true
      }
    });
  }

  async update({ updatePatientReservationInput }: { updatePatientReservationInput: UpdatePatientReservationInput }) {
    return await this.prisma.patientReservation.update({
      where: {
        id: updatePatientReservationInput.id,
      },
      data: {
        date: updatePatientReservationInput.date,
        notes: updatePatientReservationInput.notes
      }
    });
  }
  async remove(id: number) {
    return await this.prisma.patientReservation.delete({
      where: {
        id
      }
    });
  }
}
