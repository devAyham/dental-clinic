import { Injectable } from '@nestjs/common';
import { UpdatePatientBadHabitInput } from './dto/update-patient_bad-habit.input';
import { CreatePatientBadHabitForExistingPatientInput } from './dto/create-patient_bad-habit-4-existing-patient.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { GraphQLError } from 'graphql';

@Injectable()
export class PatientBadHabitsService {
  constructor(private prisma: PrismaService) { }

  async create({ bad_habet_id, patient_id, notes ,start_date}: CreatePatientBadHabitForExistingPatientInput) {
    const patientExist = await this.prisma.patient.findUnique({ where: { id: patient_id } })
    const badHabitExist = await this.prisma.badHabit.findUnique({ where: { id: bad_habet_id } })

    if (!patientExist || !badHabitExist) {
      throw new GraphQLError('patient or badHabit does not exist', {
        extensions: {
          code: 404,
        },
      })
    }
    return await this.prisma.patientBadHabet.create({
      include: { bad_habet: true },
      data: {
        bad_habet_id, notes, patient_id,start_date
      }
    })
  }

  async findAll(patient_id: number) {
    const patientExist = await this.prisma.patient.findUnique({ where: { id: patient_id } })
    if (!patientExist) {
      throw new GraphQLError('patient does not exist', {
        extensions: {
          code: 404,
        },
      })
    }

    return this.prisma.patientBadHabet.findMany({
      include: { bad_habet: true },
      where: { patient_id },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} patientBadHabit`;
  // }

  async update(id: number, updatePatientBadHabitInput: UpdatePatientBadHabitInput) {
    const patient_badHabit_exist = await this.prisma.patientBadHabet.findUnique({
      where: { id }
    })
    if (!patient_badHabit_exist) {
      throw new GraphQLError('patient badHabit does not exist', {
        extensions: {
          code: 404,
        },
      })
    }
    return this.prisma.patientBadHabet.update({
      include: { bad_habet: true },
      where: { id },
      data: {
        ...updatePatientBadHabitInput
      }
    })
  }

  async remove(id: number) {
    const patient_badHabit_exist = await this.prisma.patientBadHabet.findUnique({
      where: { id }
    })
    if (!patient_badHabit_exist) {
      throw new GraphQLError('patient badHabit does not exist', {
        extensions: {
          code: 404,
        },
      })
    }
    return this.prisma.patientBadHabet.delete({ where: { id } });
  }
}
