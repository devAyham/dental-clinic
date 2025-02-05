import { Injectable } from '@nestjs/common';
import { CreateBookInInput } from './dto/create-book_in.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { StoredProductService } from '../stored_product/stored_product.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookInService {
  constructor(private prisma: PrismaService, private stored_product: StoredProductService) { }

  async create({ product_id, expiration_date, quantity, price, created_at }: CreateBookInInput) {
    const totalprice = quantity * price;
    const book_in = await this.prisma.bookIn.create({
      data: {
        quantity: quantity,
        price: price,
        total_price: totalprice,
        created_at: created_at,
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
    const old_total_quantity = await this.prisma.storedProduct.findFirst({
      where: {
        product_id: book_in.product_id,
      },
      select: {
        total_quantity: true,
      },
    });
    const previousTotalQuantity = old_total_quantity?.total_quantity || 0;

    await this.stored_product.create({
      product_id: product_id,
      expiration_date: expiration_date,
      quantity: quantity,
      price: price,
      total_quantity: previousTotalQuantity,
    });

    // Update total_quantity for related stored_product rows

    await this.updateStoredProductTotalQuantity(book_in.product_id, book_in.quantity);
    return book_in;
  }

  async findAll(page: any, item_per_page: any, search?: string, product_id?: number) {
    return await PaginatorService<Prisma.BookInFindManyArgs>({
      Modal: this.prisma.bookIn,
      item_per_page,
      page,
      search,
      relations: {
        include: { product: true },
        where: {
          product_id
        }
      }
    });
  }

  async findOne(id: number) {
    const bookIn = await this.prisma.bookIn.findUnique({
      where: { id: id },
      include: {
        product: true
      }
    });
    return bookIn;
  }

  async productsbookedin(id: number) {
    const productsbookedin = await this.prisma.bookIn.findMany({
      where: { product_id: id },
      include: {
        product: true
      }
    });
    return productsbookedin;
  }

  // function for update the total-quantity for stored-product
  async updateStoredProductTotalQuantity(productId: number, quantity: number): Promise<void> {
    await this.prisma.storedProduct.updateMany({
      where: {
        product_id: productId,
      },
      data: {
        total_quantity: {
          increment: quantity,
        },
      },
    });
  }
}
