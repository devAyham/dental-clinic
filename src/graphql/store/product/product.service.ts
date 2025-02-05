import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async create({ name }: CreateProductInput) {
    const product = await this.prisma.product.create({
      data: { name: name },
    });
    return product;
  }

  async findAll({ item_per_page, page, search }: { page: any, item_per_page: any, search?: string }) {
    return await PaginatorService<Prisma.ProductFindManyArgs>({
      Modal: this.prisma.product,
      item_per_page,
      page,
      search,
      relations: {
        include: { storedproducts: true }
      }
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: id },
    });
    return product;
  }

  async update(id: number, { name }: UpdateProductInput) {
    const updateProduct = await this.prisma.product.update({
      where: { id: id },
      data: { name: name },
    });
    return updateProduct;
  }

  async remove(id: number) {
    return await this.prisma.product.delete({
      where: { id: id },
    });
  }

  async getProducts({ item_per_page, page, search }: { page: any, item_per_page: any, search?: string }) {
    const { data, ...restProps } = await PaginatorService<Prisma.ProductFindManyArgs>({
      Modal: this.prisma.product,
      item_per_page,
      page,
      search,
      relations: {
        include: {
          storedproducts:
          {
            where: {
              total_quantity: {
                gt: 0
              }
            }
          }
        },
        where: {
          storedproducts: {
            every: {
              total_quantity: {
                gt: 0
              },
            }
          }
        }
      }
    });
    const productsWithQuantities = await Promise.all(
      data.map(async (product) => {
        const totalQuantity = await this.getTotalQuantity(product.id);
        return {
          product_id: product.id,
          name: product.name,
          totalQuantity: totalQuantity,
        };
      })
    );
    const productsWithQuantitiesWithoutZero = productsWithQuantities.filter((product) => {
      return product.totalQuantity > 0
    })
    return {
      ...restProps,
      items: productsWithQuantitiesWithoutZero,
    };
  }

  async getTotalQuantity(productId: number) {
    const storedProduct = await this.prisma.storedProduct.findFirst({
      where: { product_id: productId },
    });
    return storedProduct?.total_quantity ?? 0;
  }
}
