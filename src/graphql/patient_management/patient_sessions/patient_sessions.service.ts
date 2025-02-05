import { Injectable } from '@nestjs/common';
import { CreatePatientSessionInput } from './dto/create-patient_session.input';
import { UpdatePatientSessionInput } from './dto/update-patient_session.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientSessionsService {
  constructor(private prisma: PrismaService) { }

  async create({
    CreatePatientTreatmentDoneStepFromSessionInput,
    patient_id,
    patiient_appointment_id,
    createPatientLabOrderFromSessionInput,
    createPatientPerscrptionFromSessionInput,
  }: CreatePatientSessionInput) {
    const { notation, ...rest } = createPatientLabOrderFromSessionInput;

    const data = await this.prisma.patientSession
      .create({
        data: {
          patient_id,
          patiient_appointment_id,
          PatientLabOrder: {
            create: {
              ...rest,

              Notation: {
                createMany: {
                  data: notation.map((n) => {
                    return { notation: n };
                  }),
                },
              },
            },
          },
          PatientPerscrptions: createPatientPerscrptionFromSessionInput && {
            create: {
              PatientPerscrptionsMedicince: {
                createMany: {
                  data: [...createPatientPerscrptionFromSessionInput.PatientPerscrptionsMedicince]
                }
              }
            },
          },
        },
      })
      .then(async (data) => {
        await this.prisma.patientAppointment.update({
          where: {
            id: patiient_appointment_id,
          },
          data: { state: 'registerd' },
        });
        return data;
      });

    await this.prisma.patientTreatmentDoneStep.createMany({
      data: [
        ...CreatePatientTreatmentDoneStepFromSessionInput.map((input) => {
          return {
            ...input,
            patient_session_id: data.id,
          };
        }),
      ],
    });
    return data;
  }

  async findAll({ patient_id }: { patient_id?: number }) {
    const data = await this.prisma.patientSession.findMany({
      where: {
        patient_id,
      },
      include: {
        patient: true,
        patient_appointment: true,
        PatientTreatmentDoneStep: {
          include: {
            patient_treatment: {
              include: { treatment: { include: { steps: true } } },
            },
          },
        },
        PatientLabOrder: {
            include:{
              Notation:true
            }
        },
        PatientPerscrptions: {
          include:{
            PatientPerscrptionsMedicince:true,
          }
          
        },
      },
    });
    return data;
  }

  async findOne(id: number) {
    const data = await this.prisma.patientSession.findUnique({
      where: { id },
      include: {
        patient: true,
        patient_appointment: true,
        PatientTreatmentDoneStep: {
          include: {
            patient_treatment: {
              include: { treatment: { include: { steps: true } } },
            },
          },
        },
        PatientLabOrder: true,
        PatientPerscrptions: true,
      },
    });
    const treatment_id =
      data.PatientTreatmentDoneStep[0].patient_treatment.treatment.id;
    const Treatment = await this.prisma.treatment.findUnique({
      where: { id: treatment_id },
      include: {
        steps: true,
      },
    });
    return {
      ...data,
      Treatment,
    };
  }

  async update(
    id: number,
    updatePatientSessionInput: UpdatePatientSessionInput,
  ) {
    return await this.prisma.patientSession.update({
      where: { id },
      data: updatePatientSessionInput,
    });
  }

  async remove(id: number) {
    return await this.prisma.patientSession.delete({
      where: {
        id,
      },
    });
  }
}
