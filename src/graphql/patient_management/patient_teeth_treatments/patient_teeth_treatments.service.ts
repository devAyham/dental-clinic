import { Injectable } from '@nestjs/common';
import { CreatePatientTeethTreatmentInput } from './dto/create-patient_teeth_treatment.input';
import { UpdatePatientTeethTreatmentInput } from './dto/update-patient_teeth_treatment.input';

@Injectable()
export class PatientTeethTreatmentsService {
  create(createPatientTeethTreatmentInput: CreatePatientTeethTreatmentInput) {
    return 'This action adds a new patientTeethTreatment';
  }

  findAll() {
    return `This action returns all patientTeethTreatments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patientTeethTreatment`;
  }

  update(id: number, updatePatientTeethTreatmentInput: UpdatePatientTeethTreatmentInput) {
    return `This action updates a #${id} patientTeethTreatment`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientTeethTreatment`;
  }
}
