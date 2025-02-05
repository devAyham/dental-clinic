import { Injectable } from '@nestjs/common';
import { UpdatePatientDiseaseInput } from './dto/update-patient_disease.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { GraphQLError } from 'graphql';
import { CreatePatientDiseaseForExistingPatientInput } from './dto/create-patient_disease-4-existing-patient.input';

@Injectable()
export class PatientDiseasesService {
  constructor(private prisma: PrismaService) { }

  async create({ disease_id, patient_id, tight, notes,start_date }: CreatePatientDiseaseForExistingPatientInput) {
    const patientExist = await this.prisma.patient.findUnique({ where: { id: patient_id } })
    const diseaseExist = await this.prisma.disease.findUnique({ where: { id: disease_id } })

    if (!patientExist || !diseaseExist) {
      throw new GraphQLError('patient or disease does not exist', {
        extensions: {
          code: 404,
        },
      })
    }
    const patient_diseases = await this.prisma.patientDisease.create({
      include: { disease: true },
      data: {
        tight, disease_id, patient_id, notes,start_date
      }
    })

    return patient_diseases
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
    return this.prisma.patientDisease.findMany({
      include: { disease: true },
      where: { patient_id }
    })
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} patientDisease`;
  // }

  async update(id: number, updatePatientDiseaseInput: UpdatePatientDiseaseInput) {
    const patient_disease_exist = await this.prisma.patientDisease.findUnique({
      where: { id }
    })
    if (!patient_disease_exist) {
      throw new GraphQLError('patient disease does not exist', {
        extensions: {
          code: 404,
        },
      })
    }
    return this.prisma.patientDisease.update({
      include: { disease: true },
      where: { id }, data: {
        
        ...updatePatientDiseaseInput
      }
    })


  }

  async remove(id: number) {
    const patient_disease_exist = await this.prisma.patientDisease.findUnique({
      where: { id }
    })
    if (!patient_disease_exist) {
      throw new GraphQLError('patient does not exist', {
        extensions: {
          code: 404,
        },
      })
    }
    return this.prisma.patientDisease.delete({ where: { id } });
  }
}
