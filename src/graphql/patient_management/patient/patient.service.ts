import { Injectable } from '@nestjs/common';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { GraphQLError } from 'graphql';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientInput: CreatePatientInput): Promise<Patient> {
    
    if(createPatientInput.phone==="0999999999"){
      throw new GraphQLError('this number is used for doctor ', { extensions: { code: 400 } });

    }
    const patient = await this.prisma.patient.findFirst({ where: { phone:createPatientInput.phone } });

    if (patient) {
      throw new GraphQLError('patient already exists ', { extensions: { code: 400 } });
    }

    const { patient_diseases, patient_badHabits, patient_medicines, ...rest } = createPatientInput
    console.log(rest.birth_date);
    
    const new_patient = await this.prisma.patient.create({
      include: {
        PatientDisease: {
          include: { disease: true },
        },
        PatientBadHabet: {
          include: { bad_habet: true },
        },
        PatientMedicine: {
          include: {
            medicine: true,
          },
        },
      },
      data: {
        ...rest,

        PatientDisease: patient_diseases && {
          createMany: { data: [...patient_diseases] },
        },
        PatientBadHabet: patient_badHabits && {
          createMany: { data: [...patient_badHabits] },
        },
        PatientMedicine: patient_medicines && {
          createMany: { data: [...patient_medicines] },
        },
      },
    });
    return new_patient;
  }

  async findAll(page?: number, item_per_page?: number, search?: string) {
    return await PaginatorService({
      Modal: this.prisma.patient,
      search,
      page,
      item_per_page,
    });
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        PatientDisease: {
          take: 3,
          include: {
            disease: true,
          },
        },
        PatientBadHabet: { take: 3, include: { bad_habet: true } },
        PatientTeethTreatment: true,
        PatientMedicine: {
          take: 3,
          include: {
            medicine: true,
          },
        },
      },
    });
    if (!patient) {
      throw new GraphQLError('patient not found', {
        extensions: {
          code: 404,
        },
      });
    }
    return patient;
  }

  async update(id: number, updatePatientInput: UpdatePatientInput) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    if (!patient) {
      throw new GraphQLError('patient not found', {
        extensions: {
          code: 404,
        },
      });
    }
    return await this.prisma.patient.update({
      where: { id },
      data: { ...updatePatientInput },
    });
  }

  async remove(id: number) {
    return await this.prisma.patient.delete({
      where: { id },
    });
  }
}
