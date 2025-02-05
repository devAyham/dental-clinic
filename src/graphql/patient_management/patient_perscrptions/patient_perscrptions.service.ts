import { Injectable } from '@nestjs/common';
import { CreatePatientPerscrptionInput } from './dto/create-patient_perscrption.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientPerscrptionsService {
  constructor(private prisma: PrismaService) { }
  async create({ patient_session_id, createPatientPerscrptionsMedicienInput }: CreatePatientPerscrptionInput) {
    // check conflicts
    const data = await this.prisma.patientPerscrptions.create({
      data: {
        patient_session_id,
        PatientPerscrptionsMedicince: {
          createMany: {
            data: createPatientPerscrptionsMedicienInput
          }
        }
      }
    });
    return data
  }

  async findAll({ patient_id, patient_session_id }: { patient_id?: number, patient_session_id?: number }) {
    return await this.prisma.patientPerscrptions.findMany({
      where: {
        patient_session_id,
        session: {
          patient_id
        }
      },
      include: {
        PatientPerscrptionsMedicince: true,
        session: true
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.patientPerscrptions.findUnique({
      where: { id }
    });
  }


  async remove(id: number) {
    return await this.prisma.patientPerscrptions.delete({ where: { id } });
  }
}
