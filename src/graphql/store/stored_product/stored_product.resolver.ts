import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StoredProductService } from './stored_product.service';
import { StoredProduct } from './entities/stored_product.entity';
import { checkIfExists, validator } from 'src/validatior/validator';
import { PaginateStoredProduct } from './entities/PaginateStoredProduct';

@Resolver(() => StoredProduct)
export class StoredProductResolver {
  constructor(private readonly storedProductService: StoredProductService) { }
  @Query(() => PaginateStoredProduct, { name: 'storedProducts' })
  async findAll(@Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('product_id', { type: () => Int, nullable: true }) product_id?: number,
    @Args('item_per_page', { type: () => Int, nullable: true }) item_per_page?: number,) {
    const data = await this.storedProductService.findAll({ item_per_page, page, product_id, search });
    return {
      ...data,
      items: data.data
    }
  }

  // @Query(() => [StoredProduct], { name: 'selectStoredProduct' })
  // async findOne(@Args('id', { type: () => Int }) id: number) {
  //   await validator(checkIfExists)({ id, modelName: 'product' });
  //   return this.storedProductService.selectStoredProduct(id);
  // }

  @Mutation(() => StoredProduct)
  async removeStoredProduct(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'storedProduct' });
    return this.storedProductService.remove(id);
  }
}
