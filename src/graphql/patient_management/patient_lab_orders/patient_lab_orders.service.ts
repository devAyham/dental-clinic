import { Injectable } from '@nestjs/common';
import { CreatePatientLabOrderInput } from './dto/create-patient_lab_order.input';
import { UpdatePatientLabOrderInput } from './dto/update-patient_lab_order.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientLabOrdersService {
  constructor(private prisma: PrismaService) {}

  async create({ notation, ...rest }: CreatePatientLabOrderInput) {
    return await this.prisma.patientLabOrder.create({
      data: {
        ...rest,
        Notation: {
          createMany: {
            data: notation.map((n) => {
              return { notation: n };
            }),
          },
        },
      },
    });
  }

  async findAll({
    lab_order_id,
    patient_session_id,
    patient_id,
  }: {
    lab_order_id?: number;
    patient_session_id?: number;
    patient_id?: number;
  }) {
    return await this.prisma.patientLabOrder.findMany({
      where: {
        lab_order_id,
        patient_session_id,
        session: {
          patient_id,
        },
      },
      include: {
        lab_order: true,
        session: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.patientLabOrder.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updatePatientLabOrderInput: UpdatePatientLabOrderInput,
  ) {
    return await this.prisma.patientLabOrder.update({
      where: { id },
      data: updatePatientLabOrderInput,
    });
  }

  async remove(id: number) {
    return await this.prisma.patientLabOrder.delete({
      where: { id },
    });
  }
}
