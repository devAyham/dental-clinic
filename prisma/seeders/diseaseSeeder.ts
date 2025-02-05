import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedDisease() {
  const diseases = [
    {
      id: 1,
      name: 'مرض السكر',
      chemical_material_id: 2,
    },
    {
      id: 2,
      name: 'مرض  القلب',
      chemical_material_id: 3,
    },
  ];

  for (const { id, name, chemical_material_id } of diseases) {
    const disease = await prisma.disease.upsert({
      where: { id },
      update: {},
      create: {
        name,
        diseaseChemicalMaterials: {
          create: {
            chemical_material_id,
          },
        },
      },
    });
  }
}
