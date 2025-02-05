import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookInService } from './book_in.service';
import { BookIn } from './entities/book_in.entity';
import { CreateBookInInput } from './dto/create-book_in.input';
import { checkIfExists, validator } from 'src/validatior/validator';
import { Paginatebookin } from './entities/Paginatebookin';

@Resolver(() => BookIn)
export class BookInResolver {
  constructor(private readonly bookInService: BookInService) { }

  @Mutation(() => BookIn)
  async createBookIn(@Args('createBookInInput') createBookInInput: CreateBookInInput) {
    await validator(checkIfExists)({ id: createBookInInput.product_id, modelName: 'product' });
    return this.bookInService.create(createBookInInput);
  }

  @Query(() => Paginatebookin, { name: 'bookIns' })
  async findAll(
    @Args('product_id', { type: () => Int, nullable: true }) product_id?: number,
    @Args('page', { nullable: true }) page?: number,
    @Args('search', { nullable: true }) serach?: string,
    @Args('item_per_page', { nullable: true }) item_per_page?: number,
  ) {
    const book_in = await this.bookInService.findAll(
      page,
      item_per_page,
      serach,
      product_id
    );
    return {
      items: book_in.data,
      totalPages: book_in.totalPages,
      page: book_in.page,
      item_per_page: book_in.item_per_page,
    };
  }

  @Query(() => BookIn, { name: 'bookIn' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'bookIn' });
    return this.bookInService.findOne(id);
  }

  @Query(() => [BookIn], { name: 'productbookedIn' })
  async productsbookedin(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName: 'product' });
    return this.bookInService.productsbookedin(id);
  }
}
