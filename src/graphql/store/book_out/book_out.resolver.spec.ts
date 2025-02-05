import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';;
import { StoredProductService } from '../stored_product/stored_product.service';
import { BookOutResolver } from './book_out.resolver';
import { BookOutService } from './book_out.service';
import { CreateBookOutInput } from './dto/create-book_out.input';

describe('BookOutResolver', () => {
  let resolver: BookOutResolver;
  let service: BookOutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookOutResolver, BookOutService, PrismaService,StoredProductService],
    }).compile();

    resolver = module.get<BookOutResolver>(BookOutResolver);
    service = module.get<BookOutService>(BookOutService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createbookout', () => {
    it('should create a new bookout', async () => {
      const createbookoutMoke = {
        id:1,
        quantity:1,
        total_price: 1000,
        created_at: expect.any(Date),
        product_id:1,
        product: {
          id:1,
          name:'test'
        }
      };
      const createbookOutInput: CreateBookOutInput = {
        quantity:1,
        created_at: expect.any(Date),
        product_id:1,
        stored_product_id:[1],
      };
      const expectedResult = {
        id:1,
        quantity:createbookOutInput.quantity,
        total_price: 1000,
        created_at: createbookOutInput.created_at,
        product_id:createbookOutInput.product_id,
        product: {
          id:1,
          name:'test'
        }
        // age:expect.any(Number)
      };
      // Create the bookout using the actual service method
      // const result = await service.create(createbookOutInput);
      // expect(result).toEqual(expectedResult);
      jest.spyOn(service, 'create').mockImplementation(async () => createbookoutMoke);
      const result = await resolver.createBookOut(createbookOutInput);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createbookOutInput);
    });
  });

  describe('findAll', () => {
    it('should return paginated bookouts', async () => {
      const page = 1;
      const search = '10';
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
      // Mock the return value of the bookoutService.findAll method
      jest.spyOn(service, 'findAll').mockImplementation(async () => findAllMock);
      const result = await resolver.findAll(page, search, itemPerPage);
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(page, itemPerPage, search);
    });
  });

  describe('find one', () => {
    it('should return single bookout', async () => {
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
  
  describe('productsbookedOust',()=>{
    it('should return products that bookedOut', async () =>{
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
     jest.spyOn(service, 'productsbookedout').mockImplementation(async () => productsMock);
     const result = await resolver.productbookedOut(id);
     expect(result).toEqual(expectedResult);
     expect(service.productsbookedout).toHaveBeenCalledWith(id);
    });
  });
});