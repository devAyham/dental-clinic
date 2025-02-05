import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';;
import { ChemicalMaterialResolver } from './chemical_material.resolver';
import { ChemicalMaterialService } from './chemical_material.service';
import { CreateChemicalMaterialInput } from './dto/create-chemical_material.input';
import { UpdateChemicalMaterialInput } from './dto/update-chemical_material.input';

describe('ChemicalMaterialResolver', () => {
  let resolver: ChemicalMaterialResolver;
  let service: ChemicalMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChemicalMaterialResolver, ChemicalMaterialService, PrismaService],
    }).compile();

    resolver = module.get<ChemicalMaterialResolver>(ChemicalMaterialResolver);
    service = module.get<ChemicalMaterialService>(ChemicalMaterialService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createchemical_material', () => {
    it('should create a new chemical_material', async () => {
      const createchemicalmaterialMoke = {
        id:1,
        name: 'test from unit test',
      };
      const createChemicalMaterialInput: CreateChemicalMaterialInput = {
        name: 'test from unit test',
        chemical_material_id: [1],
      };
      const expectedResult = {
        id: 1,
        name: createchemicalmaterialMoke.name,
        // age:expect.any(Number)
      };
      jest.spyOn(service, 'create').mockImplementation(async () => createchemicalmaterialMoke);
      const result = await resolver.createChemicalMaterial(createChemicalMaterialInput);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createChemicalMaterialInput);
    });
  });

  describe('findAll', () => {
    it('should return paginated ChemicalMaterials', async () => {
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
  describe('findOne', () => {
    it('should return a single chemical_material', async () => {
      const id = 1;
      type ChemicalChemicalMaterial = {
        id: number;
        chemical_material_1_id: number;
        chemical_material_2_id: number;
      };
      const findOneMock = {
        id: expect.any(Number),
        name: 'test',
        chemicalChemicalMaterials1: [
          {
            id: expect.any(Number),
            chemical_material_2: {
              id: expect.any(Number),
              name: 'test',
            },
          },
        ],
        chemicalChemicalMaterials2: [
          {
            id: expect.any(Number),
            chemical_material_1: {
              id: expect.any(Number),
              name: 'test',
            },
          },
        ],
        conflicts: [],
      } as {
        id: number;
        name: string;
        chemicalChemicalMaterials1: Array<{
          id: number;
          chemical_material_2: {
            id: number;
            name: string;
          };
        } & ChemicalChemicalMaterial>;
        chemicalChemicalMaterials2: Array<{
          id: number;
          chemical_material_1: {
            id: number;
            name: string;
          };
        } & ChemicalChemicalMaterial>;
        conflicts: any[];
      };
  
      jest.spyOn(service, 'findOne').mockResolvedValue(findOneMock);
      const expectedResult = {
        id: expect.any(Number),
        name: 'test',
        chemicalChemicalMaterials1: [
          {
            id: expect.any(Number),
            chemical_material_2: {
              id: expect.any(Number),
              name: 'test',
            },
          },
        ],
        chemicalChemicalMaterials2: [
          {
            id: expect.any(Number),
            chemical_material_1: {
              id: expect.any(Number),
              name: 'test',
            },
          },
        ],
        conflicts: [],
      };
      const result = await resolver.findOne(id);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('updatechemical_material', () => {
    it('should return updated chemical_material', async () => {
      const id = 1;
      const updatechemicalmaterialMoke = {
        id:1,
        name: 'test updated from unit test',
      };
      const updatechemicalmaterialInput: UpdateChemicalMaterialInput ={
        name: 'test updated from unit test ',
        chemical_material_id: [1],
      };
      const expectedResult = {
        id: expect.any(Number),
        name: updatechemicalmaterialMoke.name,
        // age:expect.any(Number)
      };
      jest.spyOn(service, 'update').mockImplementation(async () => updatechemicalmaterialMoke);
      const result = await resolver.updateChemicalMaterial(id,updatechemicalmaterialInput);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(id,updatechemicalmaterialInput);
    });
  });

  describe('delete chemicalmaterial', () => {
    it('should return deleted chemicalmaterial', async () => {
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
      const result = await resolver.removeChemicalMaterial(id);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
 });
