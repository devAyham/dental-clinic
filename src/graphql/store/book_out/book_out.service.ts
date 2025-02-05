import { Injectable } from '@nestjs/common';
import { CreateBookOutInput } from './dto/create-book_out.input';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { PrismaService } from 'src/prisma/prisma.service';
import { StoredProductService } from '../stored_product/stored_product.service';

@Injectable()
export class BookOutService {
  constructor(private prisma: PrismaService, private stored_product: StoredProductService){}
  async create({product_id,quantity,created_at,stored_product_id}: CreateBookOutInput) {
    const old_total_quantity = await this.prisma.storedProduct.findFirst({
      where: {
        product_id:product_id,
      },
      select: {
        total_quantity: true,
      },
    });
   const previousTotalQuantity = old_total_quantity.total_quantity;
   if(quantity > previousTotalQuantity){
    return Error("The quantity That you required is not available")
   }
   //Update the stored-products and get the total price of all the stored-product
   const total_price = await this.updateQuantities(stored_product_id,quantity)

   const book_out = await this.prisma.bookOut.create({
    data:{
      quantity : quantity,
      total_price:total_price,
      created_at:created_at,
      product:{
        connect:{
          id:product_id
        },
      },
    },
    include:{
      product:true
    }
   });
   //update the total-quantity for stored-product
   await this.updateStoredProductTotalQuantity(book_out.product_id, book_out.quantity);
   return book_out;
  }

  async findAll(page: any, item_per_page: any, search?: string) {
    return await PaginatorService({
      Modal: this.prisma.bookOut,
      item_per_page,
      page,
      search,
    });
  }

  async findOne(id: number) {
    const bookOut = await this.prisma.bookOut.findUnique({
      where: { id: id },
      include:{
        product:true
      }
    });
    return bookOut;
  }

  async productsbookedout(id: number) {
    const productsbookedout = await this.prisma.bookOut.findMany({
      where: { product_id: id },
      include:{
        product:true
      }
    });
    return productsbookedout;
  }
  
//function to update quantity of stored-product + if its equal to zero then delete it  
  async updateQuantities(storedProduct , quantity:number) {
    let sum1 = 0;
    let sum2 = 0;
    let totalprice = 0 ;
    for (let i = 0; i < storedProduct.length; i++) {
      const item = storedProduct[i];
      let product = await this.prisma.storedProduct.findFirst({
        where:{
          id:item
        }
      })
      console.log(product.quantity);
      if (product.quantity <= quantity) {
        let price =product.price * product.quantity
        quantity = quantity - product.quantity;
        product.quantity = 0;
        await this.stored_product.remove(product.id)
        sum1 =sum1+price
      } else {
      let price =product.price * quantity
        product.quantity = product.quantity- quantity;
        quantity = 0;
        await this.stored_product.update(product.id,{
          product_id: product.product_id,
          expiration_date: product.expiration_date,
          quantity:product.quantity,
          price: product.price,
          total_quantity:product.total_quantity,
        })
        sum2 = sum2 +price;
      }
      if (quantity === 0) {
        break;
      }
    }
    totalprice = sum1 +sum2
    return totalprice
  }
// function for update the total-quantity for stored-product
  async updateStoredProductTotalQuantity(productId: number, quantity: number): Promise<void> {
    await this.prisma.storedProduct.updateMany({
      where: {
        product_id: productId,
      },
      data: {
        total_quantity: {
          decrement: quantity,
        },
      },
    });
  }
}
