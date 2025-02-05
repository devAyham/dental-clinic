import { Module } from '@nestjs/common';
import { BookOutService } from './book_out.service';
import { BookOutResolver } from './book_out.resolver';
import { StoredProductService } from '../stored_product/stored_product.service';

@Module({
  providers: [BookOutResolver, BookOutService , StoredProductService]
})
export class BookOutModule {}
