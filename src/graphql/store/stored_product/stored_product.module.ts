import { Module } from '@nestjs/common';
import { StoredProductService } from './stored_product.service';
import { StoredProductResolver } from './stored_product.resolver';

@Module({
  providers: [StoredProductResolver, StoredProductService]
})
export class StoredProductModule {}
