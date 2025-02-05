import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedChemicalMaterial() {
  const chemicalMaterials = [
    {
      name: 'morphin',
    },
    {
      name: 'de_la_morphin',
    },
    {
      name: 'Helium',
    },
    {
      name: 'Lithium',
    },
    {
      name: 'Beryl',
    },
    {
      name: 'Borax',
    },
    {
      name: 'Carbo',
    },
    {
      name: 'Nitron',
    },
    {
      name: 'sasad ashfk',
    },
    {
      name: 'takeson',
    },
  ];

  for (const element of chemicalMaterials) {
    const existingDisease = await prisma.chemicalMaterial.findFirst({
      where: { name: element.name },
    });

    if (!existingDisease) {
      await prisma.chemicalMaterial.create({
        data: { name: element.name },
      });
    }
  }

  if (
    !(await prisma.chemicalChemicalMaterial.findFirst({
      where: {
        chemical_material_1_id: 1,
      },
    }))
  ) {
    // 1   [3]
    // 2   [3,4]
    // 3   [6,7]

    var chemical_material_id = [3];
    await prisma.chemicalChemicalMaterial.createMany({
      data: chemical_material_id.map((id) => ({
        chemical_material_1_id: 1,
        chemical_material_2_id: id,
      })),
      skipDuplicates: true,
    });

    var chemical_material_id = [3, 4];
    await prisma.chemicalChemicalMaterial.createMany({
      data: chemical_material_id.map((id) => ({
        chemical_material_1_id: 2,
        chemical_material_2_id: id,
      })),
      skipDuplicates: true,
    });

    var chemical_material_id = [6, 7];
    await prisma.chemicalChemicalMaterial.createMany({
      data: chemical_material_id.map((id) => ({
        chemical_material_1_id: 3,
        chemical_material_2_id: id,
      })),
      skipDuplicates: true,
    });

    var chemical_material_id = [8];
    await prisma.chemicalChemicalMaterial.createMany({
      data: chemical_material_id.map((id) => ({
        chemical_material_1_id: 4,
        chemical_material_2_id: id,
      })),
      skipDuplicates: true,
    });

    var chemical_material_id = [9];
    await prisma.chemicalChemicalMaterial.createMany({
      data: chemical_material_id.map((id) => ({
        chemical_material_1_id: 5,
        chemical_material_2_id: id,
      })),
      skipDuplicates: true,
    });
  }
}
