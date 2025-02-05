import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { DiseaseResolver } from './disease.resolver';
import { DiseaseService } from './disease.service';
import { CreateDiseaseInput } from './dto/create-disease.input';
import { UpdateDiseaseInput } from './dto/update-disease.input';

describe('DiseaseResolver', () => {
  let resolver: DiseaseResolver;
  let service: DiseaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiseaseResolver, DiseaseService, PrismaService],
    }).compile();

    resolver = module.get<DiseaseResolver>(DiseaseResolver);
    service = module.get<DiseaseService>(DiseaseService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createDisease', () => {
    it('should create a new disease', async () => {
      const createDiseaseMoke = {
        id:1,
        name: 'test from unit test',
      };
      const createDiseaseInput: CreateDiseaseInput = {
        name: 'test from unit test',
        chemical_material_id: [1],
      };
      const expectedResult = {
        id: 1,
        name: createDiseaseMoke.name,
        // age:expect.any(Number)
      };
      // Create the disease using the actual service method
      // const result = await service.create(createDiseaseInput);
      // expect(result).toEqual(expectedResult);
      jest.spyOn(service, 'create').mockImplementation(async () => createDiseaseMoke);
      const result = await resolver.createDisease(createDiseaseInput);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDiseaseInput);
    });
  });

  describe('findAll', () => {
    it('should return paginated diseases', async () => {
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
      // Mock the return value of the diseaseService.findAll method
      jest.spyOn(service, 'findAll').mockImplementation(async () => findAllMock);
      const result = await resolver.findAll(page, search, itemPerPage);
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(page, itemPerPage, search);
    });
  });

  describe('find one', () => {
    it('should return single disease', async () => {
      const id = 1;
      const findOneMoke = {
        id: expect.any(Number),
        name: 'test',
      };
      const expectedResult = {
        id: expect.any(Number),
        name: 'test',
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => findOneMoke);
      const result = await resolver.findOne(id);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('updatedisease', () => {
    it('should return updated disease', async () => {
      const id = 1;
      const updatediseaseMoke = {
        id:1,
        name: 'test updated from unit test',
      };
      const updatediseaseInput: UpdateDiseaseInput ={
        name: 'test updated from unit test ',
        chemical_material_id: [1],
      };
      const expectedResult = {
        id: expect.any(Number),
        name: updatediseaseMoke.name,
        // age:expect.any(Number)
      };
      jest.spyOn(service, 'update').mockImplementation(async () => updatediseaseMoke);
      const result = await resolver.updateDisease(id,updatediseaseInput);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(id,updatediseaseInput);
    });
  });

  describe('delete disease', () => {
    it('should return deleted disease', async () => {
      const id = 1;
      const deleteMoke = {
        id: expect.any(Number),
        name: 'test',
      };
      const expectedResult = {
        id: expect.any(Number),
        name: 'test',
      };
      jest.spyOn(service, 'remove').mockImplementation(async () => deleteMoke);
      const result = await resolver.removeDisease(id);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});