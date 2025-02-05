import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientAppointmentsService } from './patient_appointments.service';
import { PatientAppointment } from './entities/patient_appointment.entity';
import { CreatePatientAppointmentInput } from './dto/create-patient_appointment.input';
import { UpdatePatientAppointmentInput } from './dto/update-patient_appointment.input';

@Resolver(() => PatientAppointment)
export class PatientAppointmentsResolver {
  constructor(private readonly patientAppointmentsService: PatientAppointmentsService) { }

  @Mutation(() => PatientAppointment)
  createPatientAppointment(@Args('createPatientAppointmentInput') createPatientAppointmentInput: CreatePatientAppointmentInput) {
    return this.patientAppointmentsService.create(createPatientAppointmentInput);
  }

  @Query(() => [PatientAppointment], { name: 'patientAppointments' })
  findAll(@Args('date', { type: () => Date, nullable: true }) date?: Date) {
    return this.patientAppointmentsService.findAll({ date });
  }

  @Query(() => PatientAppointment, { name: 'patientAppointment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.patientAppointmentsService.findOne(id);
  }

  @Mutation(() => PatientAppointment)
  updatePatientAppointment(@Args('updatePatientAppointmentInput') updatePatientAppointmentInput: UpdatePatientAppointmentInput) {
    return this.patientAppointmentsService.update(updatePatientAppointmentInput.id, updatePatientAppointmentInput);
  }

  @Mutation(() => PatientAppointment)
  removePatientAppointment(@Args('id', { type: () => Int }) id: number) {
    return this.patientAppointmentsService.remove(id);
  }
}
