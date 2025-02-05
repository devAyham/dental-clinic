import { Injectable } from '@nestjs/common';
import { CreatePatientTreatmentInput } from './dto/create-patient_treatment.input';
import { UpdatePatientTreatmentInput } from './dto/update-patient_treatment.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatientTreatmentStatuses, PatientTreatmentTypes } from '@prisma/client';

@Injectable()
export class PatientTreatmentsService {
  constructor(private prisma: PrismaService) { }

  async create(createPatientTreatmentInput: CreatePatientTreatmentInput) {
    return await this.prisma.patientTreatment.create({
      data: {
        ...createPatientTreatmentInput,
        status: 'ongoing'
      },
      include: { patient: true, PatientTreatmentDoneStep: true, treatment: { include: { steps: true } } }
    });
  }

  async findAll({ patient_id, status, type }: { patient_id?: number, status?: PatientTreatmentStatuses, type?: PatientTreatmentTypes }) {
    return await this.prisma.patientTreatment.findMany({
      where: {
        patient_id,
        status, type
      },
      include: { patient: true, PatientTreatmentDoneStep: true, treatment: { include: { steps: true } } }
    });
  }

  async findOne(id: number) {
    return await this.prisma.patientTreatment.findUnique({
      where: { id },
      include: { patient: true, PatientTreatmentDoneStep: true, treatment: { include: { steps: true } } }
    });
  }

  async update(id: number, updatePatientTreatmentDoneStepInput: UpdatePatientTreatmentInput) {
    return await this.prisma.patientTreatment.update({
      where: { id },
      data: updatePatientTreatmentDoneStepInput
    });
  }

  async remove(id: number) {
    return await this.prisma.patientTreatment.delete({
      where: { id }
    });
  }
}
