import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { StoredProductService } from '../stored_product/stored_product.service';

describe('ProductResolver', () => {
  let resolver: ProductResolver;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductResolver, ProductService, PrismaService, StoredProductService],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createproduct', () => {
    it('should create a new prodcut', async () => {
      const createProductMoke = {
        id:1,
        name: 'test from unit test',
      };
      const createProductInput: CreateProductInput = {
        name: 'test from unit test',
      };
      const expectedResult = {
        id: 1,
        name: createProductMoke.name,
        // age:expect.any(Number)
      };
      // Create the bad habit using the actual service method
      jest.spyOn(service, 'create').mockImplementation(async () => createProductMoke);
      const result = await resolver.createProduct(createProductInput);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createProductInput);
    });
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const page = 1;
      const search = 'example search';
      const itemPerPage = 10;

      const findAllMock = {
        data: [],
        totalPages: 5,
        page: page,
        item_per_page: itemPerPage,
      };
      const expectedResult = {
        items: [],
        totalPages: 5,
        page: page,
        item_per_page: itemPerPage,
      };
      jest.spyOn(service, 'findAll').mockImplementation(async () => findAllMock);
      const result = await resolver.findAll(page, search, itemPerPage);
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith({ page, search, item_per_page: itemPerPage });
    });
  });

  describe('find one', () => {
    it('should return single product', async () => {
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

  describe('update product', () => {
    it('should return updated product', async () => {
      const id = 1;
      const updateProductMoke = {
        id:1,
        name: 'test updated from unit test',
      };
      const updateProductInput: UpdateProductInput = {
        name: 'test updated from unit test ',
      };
      const expectedResult = {
        id: expect.any(Number),
        name: updateProductMoke.name,
        // age:expect.any(Number)
      };
      jest.spyOn(service, 'update').mockImplementation(async () => updateProductMoke);
      const result = await resolver.updateProduct(id,updateProductInput);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(id,updateProductInput);
    });
  });

  describe('delete product', () => {
    it('should return deleted product', async () => {
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
      const result = await resolver.removeProduct(id);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('getProducts', () => {
    it('should return products with quantities greater than 0', async () => {
      const itemPerPage = 10;
      const page = 1;
      const search = 'example search';
      const mockedTotalQuantityResult = 5;

      const mockedPaginatorServiceResult = {
        data: [
          {
            id: 1,
            product_id: 1,
            name: 'Product 1',
            totalQuantity: mockedTotalQuantityResult,
          },
          {
            id: 2,
            product_id: 2,
            name: 'Product 2',
            totalQuantity: mockedTotalQuantityResult,
          },
        ],
        totalPages: 5,
        page: page,
        item_per_page: itemPerPage,
        items: [],
      };
      jest.spyOn(service, 'getTotalQuantity').mockResolvedValue(mockedTotalQuantityResult);
      jest.spyOn(service, 'getProducts').mockResolvedValue(mockedPaginatorServiceResult);
      const expectedResult = {
        data: [
          {
            id:1,
            product_id: 1,
            name: 'Product 1',
            totalQuantity: mockedTotalQuantityResult,
          },
          {
            id:2,
            product_id: 2,
            name: 'Product 2',
            totalQuantity: mockedTotalQuantityResult,
          },
        ],
        totalPages: 5,
        page: page,
        item_per_page: itemPerPage,
        items: [],
      };
      const result = await resolver.getProducts(page, search, itemPerPage);
      console.log(result);
      console.log(expectedResult)
      expect(result).toEqual(expectedResult);
      expect(service.getProducts).toHaveBeenCalledWith({item_per_page:itemPerPage,page,search,});
    });
  });
});
