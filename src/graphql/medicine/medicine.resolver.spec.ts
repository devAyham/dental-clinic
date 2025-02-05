import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { MedicineResolver } from './medicine.resolver';
import { MedicineService } from './medicine.service';
import { CreateMedicineInput } from './dto/create-medicine.input';
import { UpdateMedicineInput } from './dto/update-medicine.input';

describe('MedicineResolver', () => {
  let resolver: MedicineResolver;
  let service: MedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicineResolver, MedicineService, PrismaService],
    }).compile();

    resolver = module.get<MedicineResolver>(MedicineResolver);
    service = module.get<MedicineService>(MedicineService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createMedicine', () => {
    it('should create a new medicine', async () => {
      const createMedicineMoke = {
        id: expect.any(Number),
        name: 'test from unit test',
        concentration:10,
        category_id:1,
        category: {
          id:1,
          name:'test'
        }
      };
      const createMedicineInput: CreateMedicineInput = {
        name: 'test from unit test',
        concentration:10,
        category_id:1,
        chemical_material_id:[1]
      };
      const expectedResult = {
        id: expect.any(Number),
        name: createMedicineMoke.name,
        concentration:createMedicineMoke.concentration,
        category_id:createMedicineMoke.category_id,
        category: createMedicineMoke.category
        // age:expect.any(Number)
      };
      // Create the medicine using the actual service method
      // const result = await service.create(createMedicinInput);
      // expect(result).toEqual(expectedResult);
      jest.spyOn(service, 'create').mockImplementation(async () => createMedicineMoke);
      const result = await resolver.createMedicine(createMedicineInput);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createMedicineInput);
    });
  });

  describe('findAll', () => {
    it('should return paginated medicine', async () => {
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
      // Mock the return value of the medicine.service.findAll method
      jest.spyOn(service, 'findAll').mockImplementation(async () => findAllMock);
      const result = await resolver.findAll(page, search, itemPerPage);
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(page, itemPerPage, search);
    });
  });

  describe('find one', () => {
    it('should return single medicine', async () => {
      const id = 1;
      const findOneMoke = {
        id: expect.any(Number),
        name: 'Test Medicine',
        concentration: 10,
        category_id:1,
        category: {
          id: expect.any(Number),
          name: 'Test Category',
        },
        medicineChemicalMaterials: [
          {
            id: expect.any(Number),
            medicine_id: 1,
            chemical_material_id: 1,
            chemical_material: {
              id: expect.any(Number),
              name: 'Test Chemical Material',
            },
          },
        ],
      };
      const expectedResult = {
        id: expect.any(Number),
        name: findOneMoke.name,
        concentration:findOneMoke.concentration,
        category_id:findOneMoke.category_id,
        category: findOneMoke.category,
        medicineChemicalMaterials:findOneMoke.medicineChemicalMaterials
        // age:expect.any(Number)
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => findOneMoke);
      const result = await resolver.findOne(id);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update medicine', () => {
    it('should return updated medicine', async () => {
      const id = 1;
      const updatemedicineMoke = {
        id: expect.any(Number),
        name: 'Test Medicine',
        concentration: 10,
        category_id:1,
        category: {
          id: 1,
          name: 'Test Category',
        },
      };
      const updateMedicineInput: UpdateMedicineInput ={
        name: 'test from unit test',
        concentration:10,
        category_id:1,
        chemical_material_id:[1]
      };
      const expectedResult = {
        id: expect.any(Number),
        name: updatemedicineMoke.name,
        concentration:updatemedicineMoke.concentration,
        category_id:updatemedicineMoke.category_id,
        category: updatemedicineMoke.category
        // age:expect.any(Number)
      };
      jest.spyOn(service, 'update').mockImplementation(async () => updatemedicineMoke);
      const result = await resolver.updateMedicine(id,updateMedicineInput);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(id,updateMedicineInput);
    });
  });

  describe('delete medicine', () => {
    it('should return deleted medicine', async () => {
      const id = 1;
      const deleteMoke = {
        id: expect.any(Number),
        name: 'Test Medicine',
        concentration: 10,
        category_id:1,
      };
      const expectedResult = {
        id: expect.any(Number),
        name: deleteMoke.name,
        concentration:deleteMoke.concentration,
        category_id:deleteMoke.category_id,
      };
      jest.spyOn(service, 'remove').mockImplementation(async () => deleteMoke);
      const result = await resolver.removeMedicine(id);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});