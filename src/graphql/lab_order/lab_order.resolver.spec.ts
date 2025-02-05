import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { LabOrderResolver } from './lab_order.resolver';
import { LabOrderService } from './lab_order.service';
import { CreateLabOrderInput } from './dto/create-lab_order.input';
import { UpdateLabOrderInput } from './dto/update-lab_order.input';

describe('LabOrderResolver', () => {
  let resolver: LabOrderResolver;
  let service: LabOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabOrderResolver, LabOrderService, PrismaService],
    }).compile();

    resolver = module.get<LabOrderResolver>(LabOrderResolver);
    service = module.get<LabOrderService>(LabOrderService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe('createLabOrder', () => {
    it('should create a new lab-order', async () => {
      const createOrderMock = {
        id: expect.any(Number),
        name: 'test from unit test',
        lab_id: 1,
        price: '2000',
        lab: {
          id: 1,
          name: 'test',
          phone: '0999999999',
          email: 'amgad.lab@gmail.com',
          address: 'babela-albo4ea',
        },
      };
  
      const createOrderInput: CreateLabOrderInput = {
        name: 'test from unit test',
        lab_id: 1,
        price: '2000',
        steps_names:[]
      };
  
      const expectedResult = {
        id: expect.any(Number),
        name: createOrderMock.name,
        lab_id: createOrderMock.lab_id,
        price: createOrderMock.price,
        lab: createOrderMock.lab
      };
  
      jest.spyOn(service, 'create').mockResolvedValue(createOrderMock);
  
      const result = await resolver.createLabOrder(createOrderInput);
  
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createOrderInput);
    });
  });

  describe('findAll', () => {
    it('should return paginated lab-order', async () => {
      const page = 1;
      const search = 'example search';
      const itemPerPage = 10;
      const lab_id =1

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
      jest.spyOn(service, 'findAll').mockImplementation(async () => findAllMock);
      const result = await resolver.findAll(page, search, itemPerPage,lab_id);
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(page, itemPerPage, search,lab_id);
    });
  });

  describe('find one', () => {
    it('should return single lab-order', async () => {
      const id = 1;
      const findOneMoke = {
        id: expect.any(Number),
        name: 'test from unit test',
        lab_id: 1,
        price: '2000',
        LabOrderStep:[{
          id:1,
          name:'test',
          lab_order_id:1
        }],
        lab: {
          id: 1,
          name: 'test',
          phone: '0999999999',
          email: 'amgad.lab@gmail.com',
          address: 'babela-albo4ea',
        },
      };
      const expectedResult = {
        id: expect.any(Number),
        name: findOneMoke.name,
        lab_id: findOneMoke.lab_id,
        price: findOneMoke.price,
        LabOrderStep:findOneMoke.LabOrderStep,
        lab: findOneMoke.lab,
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => findOneMoke);
      const result = await resolver.findOne(id);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update lab-order', () => {
    it('should return updated lab-order', async () => {
      const id = 1;
      const updateorderMoke = {
        id: expect.any(Number),
        name: 'test from unit test',
        lab_id: 1,
        price: '2000',
        LabOrderStep:[{
          id:1,
          name:'test',
          lab_order_id:1
        }],
        lab: {
          id: 1,
          name: 'test',
          phone: '0999999999',
          email: 'amgad.lab@gmail.com',
          address: 'babela-albo4ea',
        },
      };
      const updateorderInput: UpdateLabOrderInput ={
        name: 'test from unit test',
        lab_id: 1,
        price: '2000',
        steps_names:[]
      };
      const expectedResult = {
        id: expect.any(Number),
        name: updateorderMoke.name,
        lab_id: updateorderMoke.lab_id,
        price: updateorderMoke.price,
        LabOrderStep:updateorderMoke.LabOrderStep,
        lab: updateorderMoke.lab,
        // age:expect.any(Number)
      };
      jest.spyOn(service, 'update').mockImplementation(async () => updateorderMoke);
      const result = await resolver.updateLabOrder(id,updateorderInput);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(id,updateorderInput);
    });
  });

  describe('delete lab-order', () => {
    it('should return deleted lab-order', async () => {
      const id = 1;
      const deleteMoke = {
        id: expect.any(Number),
        name: 'test from unit test',
        lab_id: 1,
        price: '2000',
        LabOrderStep:[{
          id:1,
          name:'test',
          lab_order_id:1
        }],
        lab: {
          id: 1,
          name: 'test',
          phone: '0999999999',
          email: 'amgad.lab@gmail.com',
          address: 'babela-albo4ea',
        },
      };
      const expectedResult = {
        id: expect.any(Number),
        name: 'test from unit test',
        lab_id: 1,
        price: '2000',
        LabOrderStep:[{
          id:1,
          name:'test',
          lab_order_id:1
        }],
        lab: {
          id: 1,
          name: 'test',
          phone: '0999999999',
          email: 'amgad.lab@gmail.com',
          address: 'babela-albo4ea',
        },
      };
      jest.spyOn(service, 'remove').mockImplementation(async () => deleteMoke);
      const result = await resolver.removeLabOrder(id);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});