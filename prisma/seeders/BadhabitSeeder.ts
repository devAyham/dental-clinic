import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedbadHabit() {
  const badHabits = [
    {
      id:1,
      name: 'تدخين',
      chemical_material_id:1
    },
    {
      id:2,
      name: 'كحولي',
      chemical_material_id:2

    },
    {
      id:3,
      name: 'بيمشي وهو نايم',
      chemical_material_id:2

    },
  ];

  for (const { id, name, chemical_material_id } of badHabits) {
    const badHabit = await prisma.badHabit.upsert({
      where: { id },
      update: {},
      create: {
        name,
        badHabitChemicalMaterials: {
          create: {
            chemical_material_id,
          },
        },
      },
    });
  }

}
