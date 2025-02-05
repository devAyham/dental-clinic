import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientReservationsService } from './patient_reservations.service';
import { PatientReservation } from './entities/patient_reservation.entity';
import { CreatePatientReservationInput } from './dto/create-patient_reservation.input';
import { UpdatePatientReservationInput } from './dto/update-patient_reservation.input';

@Resolver(() => PatientReservation)
export class PatientReservationsResolver {
  constructor(private readonly patientReservationsService: PatientReservationsService) { }

  @Mutation(() => PatientReservation)
  createPatientReservation(@Args('createPatientReservationInput') createPatientReservationInput: CreatePatientReservationInput) {
    return this.patientReservationsService.create(createPatientReservationInput);
  }

  @Query(() => [PatientReservation], { name: 'patientReservations' })
  findAll(@Args('patient_id', { type: () => Int, nullable: true }) patient_id: number) {
    return this.patientReservationsService.findAll({ patient_id });
  }

  @Mutation(() => PatientReservation)
  updatePatientReservation(@Args('updatePatientReservationInput') updatePatientReservationInput: UpdatePatientReservationInput) {
    return this.patientReservationsService.update({
      updatePatientReservationInput
    });
  }
  @Mutation(() => PatientReservation)
  removePatientReservation(@Args('id', { type: () => Int }) id: number) {
    return this.patientReservationsService.remove(id);
  }
}
