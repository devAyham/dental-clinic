import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedLabOrder() {
  const labOrders = [
    {
      id: 1,
      name: 'خدمة صناعة جسر',
      price:"233000",
      lab_id: 1,
    },
    {
      id: 2,
      name: 'خدمة صناعة طبعة',
      price:"2000",

      lab_id: 1,
    },
    {
      id: 3,
      name: 'خدمة استثنائية',
      price:"999000",

      lab_id: 1,
    },
    {
      id: 4,
      name: 'خدمة صناعة جسر',
      price:"223000",

      lab_id: 2,
    },
    {
      id: 5,
      name: 'خدمة صناعة طبعة',
      price:"5400",

      lab_id: 2,
    },
  ];

  for (const { id, ...rest } of labOrders) {
    const lab = await prisma.labOrder.upsert({
      where: { id },
      update: {},
      create: {
        ...rest,
        LabOrderStep: {
          create: {
            name: 'الخطوة الاولى',
          },
        },
      },
    });
  }
}
