import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { BadHabitResolver } from './bad_habit.resolver';
import { BadHabitService } from './bad_habit.service';
import { CreateBadHabitInput } from './dto/create-bad_habit.input';
import { UpdateBadHabitInput } from './dto/update-bad_habit.input';

describe('BadHabitResolver', () => {
  let resolver: BadHabitResolver;
  let service: BadHabitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BadHabitResolver, BadHabitService, PrismaService],
    }).compile();

    resolver = module.get<BadHabitResolver>(BadHabitResolver);
    service = module.get<BadHabitService>(BadHabitService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createBadHabit', () => {
    it('should create a new badhabit', async () => {
      const createBadHabitMoke = {
        id:1,
        name: 'test from unit test',
      };
      const createBadHabitInput: CreateBadHabitInput = {
        name: 'test from unit test',
        chemical_material_id: [1],
      };
      const expectedResult = {
        id: 1,
        name: createBadHabitMoke.name,
        // age:expect.any(Number)
      };
      // Create the bad habit using the actual service method
      jest.spyOn(service, 'create').mockImplementation(async () => createBadHabitMoke);
      const result = await resolver.createBadHabit(createBadHabitInput);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createBadHabitInput);
    });
  });

  describe('findAll', () => {
    it('should return paginated bad habits', async () => {
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
      // Mock the return value of the badHabitService.findAll method
      jest.spyOn(service, 'findAll').mockImplementation(async () => findAllMock);
      const result = await resolver.findAll(page, search, itemPerPage);
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(page, itemPerPage, search);
    });
  });

  describe('find one', () => {
    it('should return single bad habit', async () => {
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

  describe('updatebadhabit', () => {
    it('should return updated bad habit', async () => {
      const id = 1;
      const updateBadHabitMoke = {
        id:1,
        name: 'test updated from unit test',
      };
      const updateBadHabitInput: UpdateBadHabitInput = {
        name: 'test updated from unit test ',
        chemical_material_id: [1],
      };
      const expectedResult = {
        id: expect.any(Number),
        name: updateBadHabitMoke.name,
        // age:expect.any(Number)
      };
      jest.spyOn(service, 'update').mockImplementation(async () => updateBadHabitMoke);
      const result = await resolver.updateBadHabit(id,updateBadHabitInput);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(id,updateBadHabitInput);
    });
  });

  describe('delete badhabit', () => {
    it('should return deleted bad habit', async () => {
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
      const result = await resolver.removeBadHabit(id);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
