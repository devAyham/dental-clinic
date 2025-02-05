import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';;
import { BookInResolver } from './book_in.resolver';
import { BookInService } from './book_in.service';
import { CreateBookInInput } from './dto/create-book_in.input';
import { StoredProductService } from '../stored_product/stored_product.service';

describe('Bookin Resolver', () => {
  let resolver: BookInResolver;
  let service: BookInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookInResolver, BookInService, PrismaService,StoredProductService],
    }).compile();

    resolver = module.get<BookInResolver>(BookInResolver);
    service = module.get<BookInService>(BookInService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createbookin', () => {
    it('should create a new bookin', async () => {
      const createbookInMoke = {
        id:1,
        quantity:1,
        price:1000,
        total_price: 1000,
        created_at: expect.any(Date),
        product_id:1,
        product: {
          id:1,
          name:'test'
        }
      };
      const createbookInInput: CreateBookInInput = {
        quantity:1,
        price:1000,
        created_at: expect.any(Date),
        product_id:1,
        expiration_date:expect.any(Date)
      };
      const expectedResult = {
        id:1,
        quantity:createbookInInput.quantity,
        price:createbookInInput.price,
        total_price: 1000,
        created_at: createbookInInput.created_at,
        product_id:createbookInInput.product_id,
        product: {
          id:1,
          name:'test'
        }
        // age:expect.any(Number)
      };
      // Create the bookInsusing the actual service method
      // const result = await service.create(createbookInInput);
      // expect(result).toEqual(expectedResult);
      jest.spyOn(service, 'create').mockImplementation(async () => createbookInMoke);
      const result = await resolver.createBookIn(createbookInInput);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createbookInInput);
    });
  });

  describe('findAll', () => {
    it('should return paginated bookIns', async () => {
      const page = 1;
      const search = '10';
      const itemPerPage = 10;
      const product_id = 10;

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
      const result = await resolver.findAll(product_id,page, search, itemPerPage);
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(page, itemPerPage, search,product_id);
    });
  });

  describe('find one', () => {
    it('should return single bookin', async () => {
      const id = 1;
      const findOneMoke = {
        id:1,
        quantity:1,
        price:1000,
        total_price: 1000,
        created_at: expect.any(Date),
        product_id:1,
        product: {
          id:1,
          name:'test'
        }
      };
      const expectedResult = {
        id:1,
        quantity:findOneMoke.quantity,
        price:findOneMoke.price,
        total_price: 1000,
        created_at: findOneMoke.created_at,
        product_id:findOneMoke.product_id,
        product: {
          id:1,
          name:'test'
        }
        // age:expect.any(Number)
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => findOneMoke);
      const result = await resolver.findOne(id);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });
  
  describe('productsbookedin',()=>{
    it('should return products that booked in', async () =>{
      const id = 1;
      const productsMock =[{
        id:1,
        quantity:1,
        price:1000,
        total_price: 1000,
        created_at: expect.any(Date),
        product_id:1,
        product: {
          id:1,
          name:'test'
        }
      }];
      const expectedResult = [{
        id:1,
        quantity:1,
        price:1000,
        total_price: 1000,
        created_at:  expect.any(Date),
        product_id:1,
        product: {
          id:1,
          name:'test'
        }
      }];
     jest.spyOn(service, 'productsbookedin').mockImplementation(async () => productsMock);
     const result = await resolver.productsbookedin(id);
     expect(result).toEqual(expectedResult);
     expect(service.productsbookedin).toHaveBeenCalledWith(id);
    });
  });
});