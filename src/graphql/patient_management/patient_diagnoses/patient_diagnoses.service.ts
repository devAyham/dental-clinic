import { Injectable } from '@nestjs/common';
import { CreatePatientDiagnosisInput } from './dto/create-patient_diagnosis.input';
import { UpdatePatientDiagnosisInput } from './dto/update-patient_diagnosis.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client';
@Injectable()
export class PatientDiagnosesService {
  constructor(private prisma: PrismaService) { }

  async create(createPatientDiagnosisInput: CreatePatientDiagnosisInput) {
    return await this.prisma.patientDiagnose.create({
      data: createPatientDiagnosisInput,
      include: {
        problem: {
          include: {
            Problem_type: true
          }
        }
      }
    });
  }

  async findAll({ patient_id, problem_type_id, item_per_page, page }: { patient_id?: number, problem_type_id?: number, page?: number, item_per_page?: number }) {

    return await PaginatorService<Prisma.PatientDiagnoseFindManyArgs>({
      Modal: this.prisma.patientDiagnose
      , page, item_per_page,
      relations: {
        where: {
          patient_id,
          problem: {
            problem_type_id
          }
        },
        include: {
          problem: {
            include: {
              Problem_type: true
            }
          }
        }
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.patientDiagnose.findUnique({
      where: {
        id
      },
      include: {
        problem: {
          include: {
            Problem_type: true
          }
        }
      }
    });
  }

  async update(id: number, updatePatientDiagnosisInput: UpdatePatientDiagnosisInput) {
    return await this.prisma.patientDiagnose.update({
      where: { id },
      data: updatePatientDiagnosisInput,
      include: {
        problem: {
          include: {
            Problem_type: true
          }
        }
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.patientDiagnose.delete({
      where: { id },
      include: {
        problem: {
          include: {
            Problem_type: true
          }
        }
      }
    });
  }
}
