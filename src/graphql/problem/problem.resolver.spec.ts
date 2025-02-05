import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { ProblemResolver } from './problem.resolver';
import { ProblemService } from './problem.service';
import { CreateProblemInput } from './dto/create-problem.input';
import { UpdateProblemInput } from './dto/update-problem.input';

describe('DiseaseResolver', () => {
  let resolver: ProblemResolver;
  let service: ProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemResolver, ProblemService, PrismaService],
    }).compile();

    resolver = module.get<ProblemResolver>(ProblemResolver);
    service = module.get<ProblemService>(ProblemService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createproblem', () => {
    it('should create a new problem', async () => {
      const createproblemMoke = {
        id:1,
        name: 'test from unit test',
        problem_type_id:1,
        Problem_type: {
          id:1,
          name:'test'
        }
      };
      const createProblemInput: CreateProblemInput = {
        name: 'test from unit test',
        problem_type_id:1
      };
      const expectedResult = {
        id: 1,
        name: createproblemMoke.name,
        problem_type_id:1,
        Problem_type: createproblemMoke.Problem_type
        // age:expect.any(Number)
      };
      // Create the problem using the actual service method
      // const result = await service.create(createProblemInput);
      // expect(result).toEqual(expectedResult);
      jest.spyOn(service, 'create').mockImplementation(async () => createproblemMoke);
      const result = await resolver.createProblem(createProblemInput);
      console.log(expectedResult)
      console.log(result)
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createProblemInput);
    });
  });

  describe('findAll', () => {
    it('should return paginated problems', async () => {
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
    it('should return single problem', async () => {
      const id = 1;
      const findOneMoke = {
        id: expect.any(Number),
        name: 'test',
        problem_type_id:1,
        Problem_type: {
          id:1,
          name:'test'
        }
      };
      const expectedResult = {
        id: 1,
        name: findOneMoke.name,
        problem_type_id:1,
        Problem_type: findOneMoke.Problem_type
        // age:expect.any(Number)
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
      const updateproblemMoke = {
        id:1,
        name: 'test from unit test',
        problem_type_id:1,
        Problem_type: {
          id:1,
          name:'test'
        }
      };
      const updateproblemInput: UpdateProblemInput ={
        name: 'test from unit test',
        problem_type_id:1

      };
      const expectedResult = {
        id: 1,
        name: updateproblemMoke.name,
        problem_type_id:1,
        Problem_type: updateproblemMoke.Problem_type
        // age:expect.any(Number)
      };
      jest.spyOn(service, 'update').mockImplementation(async () => updateproblemMoke);
      const result = await resolver.updateProblem(id,updateproblemInput);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(id,updateproblemInput);
    });
  });

  describe('delete problem', () => {
    it('should return deleted problem', async () => {
      const id = 1;
      const deleteMoke = {
        id:1,
        name: 'test from unit test',
        problem_type_id:1,
        Problem_type: {
          id:1,
          name:'test'
        }
      };
      const expectedResult = {
        id: 1,
        name: deleteMoke.name,
        problem_type_id:1,
        Problem_type: deleteMoke.Problem_type
      };
      jest.spyOn(service, 'remove').mockImplementation(async () => deleteMoke);
      const result = await resolver.removeProblem(id);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});