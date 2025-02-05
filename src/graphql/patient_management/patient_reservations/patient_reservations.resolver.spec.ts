import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { PatientReservationsResolver } from './patient_reservations.resolver';
import { PatientReservationsService } from './patient_reservations.service';
import { CreatePatientReservationInput } from './dto/create-patient_reservation.input';

describe('PatientReservationsResolver', () => {
  let resolver: PatientReservationsResolver;
  let service: PatientReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientReservationsResolver, PatientReservationsService, PrismaService],
    }).compile();

    resolver = module.get<PatientReservationsResolver>(PatientReservationsResolver);
    service = module.get<PatientReservationsService>(PatientReservationsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('create PatientReservations', () => {
    it('should create a new PatientReservations', async () => {
      // const createPatientReservationsMoke = {
      //   id:1,
      //   name: 'test from unit test',
      // };
      const createPatientReservationInput: CreatePatientReservationInput = {
        patient_id: 1,
        date : new Date('10-10-2024 13:00'),
        notes:'test'
      };
      const expectedResult = {
        id:3,
        patient_id: 1,
        date : new Date('10-10-2024 13:00 '),
        notes:'test',
        patient:{
          address: "ببيلا",
          birth_date: "16-12-2001",
          created_at:expect.any(Date),
          gender: "male",
          id: 1,
          job: "back-end developer",
          main_complaint: null,
          maintal_status: null,
          name: "Amgad samer wattar ",
          phone: "911111111",
        }
      };
      // Create the disease using the actual service method
      const result = await service.create(createPatientReservationInput);
      // jest.spyOn(service, 'create').mockImplementation(async () => createPatientReservationsMoke);
      // const result = await resolver.createPatientReservation(createPatientReservationInput);
      expect(result).toEqual(expectedResult);
    });
  });

});