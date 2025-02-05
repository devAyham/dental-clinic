import { Injectable } from '@nestjs/common';
import { CreatePatientMedicalImageInput } from './dto/create-patient_medical_image.input';
import { UpdatePatientMedicalImageInput } from './dto/update-patient_medical_image.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImagesUploaderService } from 'src/images_uploader/images_uploader.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PatientMedicalImagesService {
  private host
  constructor(private prisma: PrismaService, private imageUploaderService: ImagesUploaderService,
    private configService: ConfigService,
    ) { 
      this.host = configService.get('host')

    }
  async create({ medical_image_type_id, patient_id, title, image }: CreatePatientMedicalImageInput) {
    const { src } = await this.imageUploaderService.store({
      image,
      title,
      patient_id
    })

    const img =  await this.prisma.patientMedicalImage.create({
      data: {
        src,
        title,
        created_at: new Date(Date.now()),
        medical_image_type_id,
        patient_id
      },
      include: {
        imageType: true
      }
    });
    img.src= join(this.host,img.src)
    return img
  }

  async findAll(patient_id?: number, medical_image_type_id?: number) {
    const images = await this.prisma.patientMedicalImage.findMany({
      where: {
        patient_id,
        medical_image_type_id
      },
      include: {
        imageType: true,
      }
    });
    const a =  images.filter((image)=>{
       image.src=join(this.host,image.src)
       return image
    })
    return a 
  }

  async update(id: number, updatePatientMedicalImageInput: UpdatePatientMedicalImageInput) {
    const img= await this.prisma.patientMedicalImage.update({
      where: { id },
      data: {
        ...updatePatientMedicalImageInput
      },
    });
    img.src= join(this.host,img.src)
    return img
  }

  async remove(id: number) {
    return await this.prisma.patientMedicalImage.delete({
      where: { id }
    });
  }
}
