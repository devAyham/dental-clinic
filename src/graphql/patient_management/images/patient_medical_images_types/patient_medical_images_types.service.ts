import { Injectable } from '@nestjs/common';
import { CreatePatientMedicalImagesTypeInput } from './dto/create-patient_medical_images_type.input';
import { UpdatePatientMedicalImagesTypeInput } from './dto/update-patient_medical_images_type.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientMedicalImagesTypesService {
  constructor(private prisma: PrismaService) { }
  async create(createPatientMedicalImagesTypeInput: CreatePatientMedicalImagesTypeInput) {
    return await this.prisma.patientMedicalImageType.create({
      data: {
        ...createPatientMedicalImagesTypeInput
      }
    });
  }
  async findAll() {
    return await this.prisma.patientMedicalImageType.findMany()
  }
  async findOne(id: number) {
    return await this.prisma.patientMedicalImageType.findUnique({
      where: {
        id
      }
    });
  }
  async update(id: number, updatePatientMedicalImagesTypeInput: UpdatePatientMedicalImagesTypeInput) {
    return await this.prisma.patientMedicalImageType.update({
      where: { id },
      data: {
        ...updatePatientMedicalImagesTypeInput
      }
    });
  }
  async remove(id: number) {
    return await this.prisma.patientMedicalImageType.delete({
      where: {
        id
      }
    });
  }
}
