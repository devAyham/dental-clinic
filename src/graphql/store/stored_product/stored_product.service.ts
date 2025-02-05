import { Injectable } from '@nestjs/common';
import { CreateStoredProductInput } from './dto/create-stored_product.input';
import { UpdateStoredProductInput } from './dto/update-stored_product.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client';

@Injectable()
export class StoredProductService {
  constructor(private prisma: PrismaService) { }

  async create({ product_id, expiration_date, quantity, price, total_quantity }: CreateStoredProductInput) {
    const stored_product = await this.prisma.storedProduct.create({
      data: {
        expiration_date: expiration_date,
        quantity: quantity,
        price: price,
        total_quantity: total_quantity,
        product: {
          connect: {
            id: product_id
          },
        },
      },
      include: {
        product: true
      }
    });
    return stored_product;
  }

  async findAll({ product_id, item_per_page, page, search }: { product_id?: number, page: any, item_per_page: any, search?: string }) {
    return await PaginatorService<Prisma.StoredProductFindManyArgs>({
      Modal: this.prisma.storedProduct,
      item_per_page,
      page,
      search,
      relations: {
        include: {
          product: true
        },
        where: { product_id }
      }
    });
  }

  // async selectStoredProduct(id: number) {

  //   const a = await this.prisma.storedProduct.findMany({
  //     where: { product_id: id },
  //     include: {
  //       product: true
  //     }
  //   });
  //   return a
  // }

  async update(id: number, { product_id, expiration_date, quantity, price, total_quantity }: UpdateStoredProductInput) {
    const updateStoredProduct = await this.prisma.storedProduct.update({
      where: { id: id },
      data: {
        expiration_date: expiration_date,
        quantity: quantity,
        price: price,
        total_quantity: total_quantity,
        product: {
          connect: {
            id: product_id
          },
        },
      },
      include: {
        product: true
      }
    })
    return updateStoredProduct;
  }

  async remove(id: number) {
    return await this.prisma.storedProduct.delete({
      where: { id: id },
    });
  }
}
