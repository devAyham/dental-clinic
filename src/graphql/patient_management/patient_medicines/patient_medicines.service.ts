import { Injectable } from '@nestjs/common';
import { UpdatePatientMedicineInput } from './dto/update-patient_medicine.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientMedicineForExistingPatientInput } from './dto/create-patient_medicine-4-existing-patient.input';
import { GraphQLError } from 'graphql';

@Injectable()
export class PatientMedicinesService {
  constructor(private prisma: PrismaService) { }

  async create({ medicine_id, patient_id, notes,start_date }: CreatePatientMedicineForExistingPatientInput) {
    const patientExist = await this.prisma.patient.findUnique({ where: { id: patient_id } })
    const medicineExist = await this.prisma.medicine.findUnique({ where: { id: medicine_id } })

    if (!patientExist || !medicineExist) {
      throw new GraphQLError('patient or medicine does not exist', {
        extensions: {
          code: 404,
        },
      })
    }

    return this.prisma.patientMedicine.create({
      include: { medicine: true },

      data: {
        medicine_id, notes, patient_id,start_date
      }
    });
  }

  async findAll(patient_id: number) {
    const patientExist = await this.prisma.patient.findUnique({ where: { id: patient_id } })

    if (!patientExist) {
      throw new GraphQLError('patient or medicine does not exist', {
        extensions: {
          code: 404,
        },
      })
    }

    return this.prisma.patientMedicine.findMany({
      where: { patient_id },
      include: { medicine: true },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} patientMedicine`;
  // }

  async update(id: number, updatePatientMedicineInput: UpdatePatientMedicineInput) {
    const patient_medicine_exist = await this.prisma.patientMedicine.findUnique({
      where: { id }
    })
    if (!patient_medicine_exist) {
      throw new GraphQLError('patient does not exist', {
        extensions: {
          code: 404,
        },
      })
    }
    return await this.prisma.patientMedicine.update({
      where: { id },
      include: { medicine: true },
      data: {
        ...updatePatientMedicineInput
      }
    });
  }

  async remove(id: number) {
    const patient_medicine_exist = await this.prisma.patientMedicine.findUnique({
      where: { id }
    })
    if (!patient_medicine_exist) {
      throw new GraphQLError('patient medicine does not exist', {
        extensions: {
          code: 404,
        },
      })
    }
    return this.prisma.patientMedicine.delete({ where: { id } });
  }
}
