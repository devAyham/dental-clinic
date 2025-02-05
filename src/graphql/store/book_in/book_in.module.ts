import { Module } from '@nestjs/common';
import { BookInService } from './book_in.service';
import { BookInResolver } from './book_in.resolver';
import { StoredProductService } from '../stored_product/stored_product.service';

@Module({
  providers: [BookInResolver, BookInService, StoredProductService]
})
export class BookInModule {}
