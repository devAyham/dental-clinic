import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { checkIfExists, validator } from 'src/validatior/validator';
import { Paginateproduct } from './entities/Paginateproduct';
import { GetProducts } from './entities/GetProductsOutput';
import { PaginateGetProducts } from './entities/PaginateGetproduct';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }

  @Query(() => Paginateproduct, { name: 'products' })
  async findAll(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('item_per_page', { type: () => Int, nullable: true }) item_per_page?: number,
  ) {
    const product = await this.productService.findAll(
      {
        page,
        item_per_page,
        search,
      }
    );
    return {
      items: product.data,
      totalPages: product.totalPages,
      page: product.page,
      item_per_page: product.item_per_page,
    };
  }

  @Query(() => Product, { name: 'product' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'product' });
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    await validator(checkIfExists)({ id, modelName: 'product' });
    return this.productService.update(id, updateProductInput);
  }

  @Mutation(() => Product)
  async removeProduct(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'product' });
    return this.productService.remove(id);
  }

  @Query(() => PaginateGetProducts, { name: 'getProducts' })
  async getProducts(@Args('page', { nullable: true }) page?: number,
    @Args('search', { nullable: true }) search?: string,
    @Args('item_per_page', { nullable: true }) item_per_page?: number,) {

    return await this.productService.getProducts({ item_per_page, page, search });
  }
}
