import { Injectable } from '@nestjs/common';
import { UpdatePatientTreatmentDoneStepInput } from './dto/update-patient_treatment_done_step.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientTreatmentDoneStepInput } from './dto/create-patient_treatment_done_step.input';

@Injectable()
export class PatientTreatmentDoneStepsService {
  constructor(private prisma: PrismaService) { }

  async create({ patient_treatment_id, ...restProps }: CreatePatientTreatmentDoneStepInput) {
    const patientTreatment = await this.prisma.patientTreatment.findFirst({
      where: { id: patient_treatment_id },
      select: { treatment_id: true }
    })
    const treatment_steps = await this.prisma.step.count({
      where: {
        treatment_id: patientTreatment.treatment_id
      }
    })
    const patient_treatment_done_steps = await this.prisma.patientTreatmentDoneStep.count({
      where: {
        patient_treatment_id
      },
    });
    if (patient_treatment_done_steps === treatment_steps) {
      throw new Error('you can not add done steps more than the accual steps')
    }
    const data = await this.prisma.patientTreatmentDoneStep.create({
      data: { patient_treatment_id, ...restProps },
      include: {
        patient_treatment: {
          select: {
            treatment_id: true
          }
        }
      }
    }).then(async (data) => {
      if ((patient_treatment_done_steps + 1) === treatment_steps) {
        await this.prisma.patientTreatment.update({
          where: { id: patient_treatment_id },
          data: {
            status: 'done'
          }
        })
      }
      return data
    })
    return data

  }

  async findAll({ patient_session_id, patient_treatment_id }: {
    patient_session_id?: number, patient_treatment_id?: number
  }) {
    return await this.prisma.patientTreatmentDoneStep.findMany({
      where: {
        patient_session_id,
        patient_treatment_id,
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.patientTreatmentDoneStep.findUnique({
      where: { id }
    });
  }

  async update(id: number, updatePatientTreatmentDoneStepInput: UpdatePatientTreatmentDoneStepInput) {
    return await this.prisma.patientTreatmentDoneStep.update({
      data: updatePatientTreatmentDoneStepInput,
      where: { id }
    });
  }

  async remove(id: number) {
    return await this.prisma.patientTreatmentDoneStep.delete({
      where: { id }
    });
  }
}
