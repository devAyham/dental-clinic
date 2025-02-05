import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { TreatmentResolver } from './treatment.resolver';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentInput } from './dto/create-treatment.input';
import { UpdateTreatmentInput } from './dto/update-treatment.input';

describe('DiseaseResolver', () => {
  let resolver: TreatmentResolver;
  let service: TreatmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreatmentResolver, TreatmentService, PrismaService],
    }).compile();

    resolver = module.get<TreatmentResolver>(TreatmentResolver);
    service = module.get<TreatmentService>(TreatmentService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('create treatment', () => {
    it('should create a new Treatment', async () => {
      const createTreatmentMoke = {
        id:1,
        name: 'test from unit test',
        price:1000,
        color: 'red',
        treatment_type_id : 1,
        treatment_type:{
          id:1,
          name:'test'
        },
        steps:[{
          id:1,
          name:'test',
          treatment_id: 1,
          subSteps:[{
            id:1,
            name:'test',
            step_id: 1
          }]
        }]
      };
      const createTreatmentInput: CreateTreatmentInput = {
        name: 'test from unit test',
        price:1000,
        color: 'red',
        treatment_type_id:1,
        steps:[{
          name:'test',
          subSteps:[{
            name:'test',
          }]
        }]
      };
      const expectedResult = {
        id: 1,
        name: createTreatmentMoke.name,
        price:createTreatmentMoke.price,
        color: createTreatmentMoke.color,
        treatment_type_id:createTreatmentMoke.treatment_type_id,
        treatment_type: createTreatmentMoke.treatment_type,
        steps:createTreatmentMoke.steps
        // age:expect.any(Number)
      };
      // Create the Treatment using the actual service method
      // const result = await service.create(createTreatmentInput);
      // expect(result).toEqual(expectedResult);
      jest.spyOn(service, 'create').mockImplementation(async () => createTreatmentMoke);
      const result = await resolver.createTreatment(createTreatmentInput);
      console.log(expectedResult)
      console.log(result)
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createTreatmentInput);
    });
  });

  describe('findAll', () => {
    it('should return paginated Tretaments', async () => {
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
        items: [],
        totalPages: 5,
        page: page,
        item_per_page: itemPerPage,
        // age:expect.any(Number)
      };
      // Mock the return value of the problemService.findAll method
      jest.spyOn(service, 'findAll').mockImplementation(async () => findAllMock);
      const result = await resolver.findAll(page, search, itemPerPage);
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(page, itemPerPage, search);
    });
  });

  describe('find one', () => {
    it('should return single Treatment', async () => {
      const id = 1;
      const findOneMoke = {
        id:1,
        name: 'test from unit test',
        price:1000,
        color: 'red',
        treatment_type_id : 1,
        treatment_type:{
          id:1,
          name:'test'
        },
        steps:[{
          id:1,
          name:'test',
          treatment_id: 1,
          subSteps:[{
            id:1,
            name:'test',
            step_id: 1
          }]
        }]
      };
      const expectedResult = {
        id: 1,
        name: findOneMoke.name,
        price:findOneMoke.price,
        color: findOneMoke.color,
        treatment_type_id:findOneMoke.treatment_type_id,
        treatment_type: findOneMoke.treatment_type,
        steps:findOneMoke.steps
        // age:expect.any(Number)
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => findOneMoke);
      const result = await resolver.findOne(id);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update Treatment', () => {
    it('should return updated Treatment', async () => {
      const id = 1;
      const updateproblemMoke = {
        id:1,
        name: 'test from unit test',
        price:1000,
        color: 'red',
        treatment_type_id : 1,
        treatment_type:{
          id:1,
          name:'test'
        },
        steps:[{
          id:1,
          name:'test',
          treatment_id: 1,
          subSteps:[{
            id:1,
            name:'test',
            step_id: 1
          }]
        }]
      };
      const updateproblemInput: UpdateTreatmentInput ={
        name: 'test from unit test',
        price:1000,
        color: 'red',
        treatment_type_id:1,
        steps:[{
          name:'test',
          subSteps:[{
            name:'test',
          }]
        }]
      };
      const expectedResult = {
        id: 1,
        name: updateproblemMoke.name,
        price:updateproblemMoke.price,
        color: updateproblemMoke.color,
        treatment_type_id:updateproblemMoke.treatment_type_id,
        treatment_type: updateproblemMoke.treatment_type,
        steps:updateproblemMoke.steps,
        // age:expect.any(Number)
      };
      jest.spyOn(service, 'update').mockImplementation(async () => updateproblemMoke);
      const result = await resolver.updateTreatment(id,updateproblemInput);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(id,updateproblemInput);
    });
  });

  describe('delete Treatment', () => {
    it('should return deleted Treatment', async () => {
      const id = 1;
      const deleteMoke = {
        id:1,
        name: 'test from unit test',
        treatment_type_id:1,
        price:1000,
        color: 'red',
      };
      const expectedResult = {
        id: 1,
        name: deleteMoke.name,
        treatment_type_id:deleteMoke.treatment_type_id,
        price: deleteMoke.price,
        color: deleteMoke.color
      };
      jest.spyOn(service, 'remove').mockImplementation(async () => deleteMoke);
      const result = await resolver.removeTreatment(id);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});