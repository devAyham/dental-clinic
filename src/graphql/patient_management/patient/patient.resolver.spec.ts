import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { PatientResolver } from './patient.resolver';
import { PatientService } from './patient.service';
import { CreatePatientInput } from './dto/create-patient.input';
import { Gender } from '@prisma/client';
import { UpdatePatientInput } from './dto/update-patient.input';

describe('PatientResolver', () => {
  let resolver: PatientResolver;
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientResolver, PatientService, PrismaService],
    }).compile();

    resolver = module.get<PatientResolver>(PatientResolver);
    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('create Patient', () => {
    it('should create a new Patient', async () => {
      const createPatientMoke = {
        id:1,
        name: 'test from unit test',
        gender : Gender.male,
        phone: '0919999999',
        birth_date:'2000/02/02',
        job:'test',
        address:'test',
        main_complaint:'test',
        maintal_status:'test',
      };
      const createPatientInput: CreatePatientInput = {
        name: 'test from unit test',
        gender:Gender.male,
        phone: '0919999999',
        birth_date:'2000/02/02',
        job:'test',
        address:'test',
        main_complaint:'test',
        maintal_status:'test',
      };
      const expectedResult = {
        id:1,
        name: createPatientMoke.name,
        gender : createPatientMoke.gender,
        phone: createPatientMoke.phone,
        birth_date:createPatientMoke.birth_date,
        job:createPatientMoke.job,
        address:createPatientMoke.address,
        main_complaint:createPatientMoke.main_complaint,
        maintal_status:createPatientMoke.maintal_status,
        // age:expect.any(Number)
      };
      // Create the Patient using the actual service method
      // const result = await service.create(createPatientInput);
      // expect(result).toEqual(expectedResult);
      jest.spyOn(service, 'create').mockImplementation(async () => createPatientMoke);
      const result = await resolver.createPatient(createPatientInput);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createPatientInput);
    });
  });

  describe('findAll', () => {
    it('should return paginated Patient', async () => {
      const page = 1;
      const search = 'example search';
      const itemPerPage = 10;

      const findAllMock = {
        data: [],
        items: {},
        totalPages: 5,
        page: page,
        item_per_page: itemPerPage,
        // age: expect.any(Number)
      };
      const expectedResult = {
        data:[],
        items: [],
        totalPages: 5,
        page: page,
        item_per_page: itemPerPage,
        // age:expect.any(Number)
      };
      // Mock the return value of the diseaseService.findAll method
      jest.spyOn(service, 'findAll').mockImplementation(async () => findAllMock);
      const result = await resolver.findAll (search ,page, itemPerPage);
      console.log(result)
      console.log(expectedResult)
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(page, itemPerPage, search);
    });
  });

  describe('findOne', () => {
    it('should return a single Patient', async () => {
      const id = 1;
  
      const findOneMock = {
        id: 1,
        name: 'test from unit test',
        gender: Gender.male,
        phone: '0919999999',
        birth_date: '2000/02/02',
        job: 'test',
        address: 'test',
        main_complaint: 'test',
        marital_status: 'test',
        created_at: new Date(),
        maintal_status:'test',
        PatientBadHabet:[],
        PatientCost:[],
        PatientDiagnose:[],
        PatientDisease:[],
        PatientMedicine:[],
        PatientPayment:[],
        PatientTeethTreatment:[],
      };
  
      const expectedResult = {
        id: 1,
        name: findOneMock.name,
        gender: findOneMock.gender,
        phone: findOneMock.phone,
        birth_date: findOneMock.birth_date,
        job: findOneMock.job,
        address: findOneMock.address,
        main_complaint: findOneMock.main_complaint,
        marital_status: findOneMock.marital_status,
        maintal_status: findOneMock.maintal_status,
        created_at:findOneMock.created_at,
        PatientBadHabet:[],
        PatientCost:[],
        PatientDiagnose:[],
        PatientDisease:[],
        PatientMedicine:[],
        PatientPayment:[],
        PatientTeethTreatment:[],
      };
  
      jest.spyOn(service, 'findOne').mockResolvedValue(findOneMock);
      const result = await resolver.findOne(id);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update patient', () => {
    it('should return updated patient', async () => {
      const updatepatientMoke = {
        id:1,
        name: 'test from unit test',
        gender : Gender.male,
        phone: '0919999999',
        birth_date:'2000/02/02',
        job:'test',
        address:'test',
        main_complaint:'test',
        maintal_status:'test',
        created_at: new Date(),
      };
      const updatepatientInput: UpdatePatientInput ={
        id:1,
        name: 'test from unit test',
        gender:Gender.male,
        birth_date:'2000/02/02',
        job:'test',
        address:'test',
        main_complaint:'test',
        maintal_status:'test',
      };
      const expectedResult = {
        id:expect.any(Number),
        name: updatepatientMoke.name,
        gender : updatepatientMoke.gender,
        birth_date:updatepatientMoke.birth_date,
        job:updatepatientMoke.job,
        address:updatepatientMoke.address,
        main_complaint:updatepatientMoke.main_complaint,
        maintal_status:updatepatientMoke.maintal_status,
        created_at: updatepatientMoke.created_at,
        phone: updatepatientMoke.phone
        // age:expect.any(Number)
      };
      jest.spyOn(service, 'update').mockImplementation(async () => updatepatientMoke);
      const result = await resolver.updatePatient(updatepatientInput);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(updatepatientInput.id,updatepatientInput);
    });
  });

  describe('delete disease', () => {
    it('should return deleted disease', async () => {
      const id = 1;
      const deleteMoke = {
        id:expect.any(Number),
        name: 'test from unit test',
        gender : Gender.male,
        phone: '0919999999',
        birth_date:'2000/02/02',
        job:'test',
        address:'test',
        main_complaint:'test',
        maintal_status:'test',
        created_at:expect.any(Date)
      };
      const expectedResult = {
        id:deleteMoke.id,
        name: deleteMoke.name,
        gender : deleteMoke.gender,
        phone: deleteMoke.phone,
        birth_date:deleteMoke.birth_date,
        job:deleteMoke.job,
        address:deleteMoke.address,
        main_complaint:deleteMoke.main_complaint,
        maintal_status:deleteMoke.maintal_status,
        created_at:expect.any(Date)
      };
      jest.spyOn(service, 'remove').mockImplementation(async () => deleteMoke);
      const result = await resolver.removePatient(id);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});