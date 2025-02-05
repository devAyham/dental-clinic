import {
  PatientTreatmentStatuses,
  PatientTreatmentTypes,
  PrismaClient,
} from '@prisma/client';
const prisma = new PrismaClient();

export async function seedTreatmentType() {
  const treatments = [
    {
      id: 1,
      name: 'فكية',
    },
    {
      id: 2,
      name: 'جراحة',
    },
    {
      id: 3,
      name: 'تجميل',
    },
  ];

  for (const { name, id } of treatments) {
    console.log(name);

    await prisma.treatmentType.upsert({
      where: { id },
      update: {},
      create: {
        name,
      },
    });
  }
}

export async function seedTreatment() {
  const treatments = [
    {
      id: 1,
      name: 'قلع',
      color: 'red',
      price: 1200,
      treatment_type_id: 1,
    },
    {
      id: 2,
      name: 'نخر',
      color: 'blue',
      price: 2200,
      treatment_type_id: 1,
    },
    {
      id: 3,
      name: 'تلبيس',
      color: 'green',
      price: 1400,
      treatment_type_id: 2,
    },
    {
      id: 4,
      name: 'زرع سنان',
      color: 'yellow',
      price: 12400,
      treatment_type_id: 2,
    },
  ];
  for (const { color, name, id, price, treatment_type_id } of treatments) {
    await prisma.treatment.upsert({
      where: { id },
      update: {},
      create: {
        name,
        color,
        price,
        treatment_type_id,
      },
    });
  }
}
