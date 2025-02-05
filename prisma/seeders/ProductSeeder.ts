import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedProduct() {
  const products = [
    {
      id: 1,
      name: 'معجون سنان',
    },
    {
      id: 2,
      name: 'ابر',
    },
  ];

  for (const { id, name } of products) {
    const product = await prisma.product.upsert({
      where: { id },
      update: {},
      create: {
        name,
      },
    });
  }
}

export async function seedBookIn() {
  const booksin = [
    {
      id: 1,
      price: 5000,
      quantity: 2,
      total_price: 5000 * 2,
      product_id: 1,
      expiration_date: '2023-11-09T10:00:00.000Z',

      total_quantity: 2,
    },
    {
      id: 1,
      price: 2200,
      quantity: 2,
      total_price: 2200 * 2,
      product_id: 2,
      expiration_date: '2023-12-09T10:00:00.000Z',
      total_quantity: 2,
    },
  ];

  for (const { id, expiration_date, total_quantity, ...rest } of booksin) {
    const bookin = await prisma.bookIn.upsert({
      where: { id },
      update: {},
      create: {
        ...rest,
      },
    });
  }

  for (const { id, total_price, ...rest } of booksin) {
    const stored_product = await prisma.storedProduct.upsert({
      where: { id },
      update: {},
      create: {
        ...rest,
      },
    });
  }
}
