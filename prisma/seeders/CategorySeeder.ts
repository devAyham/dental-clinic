import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedCategory() {
  const categories = [
    {
      id: 1,
      name: 'حبة',
    },
    {
      id: 2,
      name: 'شراب',
    },
    {
      id: 3,
      name: 'ابرة',
    },
    {
      id: 4,
      name: 'نوع مو معروف',
    },
  ];

  for (const { id, name } of categories) {
    const category = await prisma.category.upsert({
      where: { id },
      update: {},
      create: {
        name,
      },
    });
  }
}
