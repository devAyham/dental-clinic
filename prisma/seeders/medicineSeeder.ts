import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedMedicines() {
  const medicines = [
    {
      id: 1,
      name: 'setamol',
      category_id: 1,
      concentration: 2.2,
      chemical_materials_ids: [1, 2],
    },

    {
      id: 2,
      name: 'panadol',
      category_id: 1,
      concentration: 1.3,
      chemical_materials_ids: [3, 5],

      // medicineChemicalMaterials: {
      //   createMany: {
      //     data: [{ chemical_material_id: 3 }, { chemical_material_id: 4 }],
      //   },
      // },
    },
    {
      id: 3,
      name: 'nedformed-imed',
      category_id: 1,
      concentration: 1.3,
      chemical_materials_ids: [5, 6],

      // medicineChemicalMaterials: {
      //   createMany: {
      //     data: [{ chemical_material_id: 5 }, { chemical_material_id: 6 }],
      //   },
      // },
    },
    {
      id: 4,
      name: 'xxxxx',
      category_id: 2,
      concentration: 0.3,
      chemical_materials_ids: [1, 3],

      // medicineChemicalMaterials: {
      //   createMany: {
      //     data: [{ chemical_material_id: 1 }, { chemical_material_id: 3 }],
      //   },
      // },
    },
  ];

  for (const { chemical_materials_ids, id, ...other } of medicines) {
    const medicine = await prisma.medicine.upsert({
      where: { id },
      update: {},
      create: {
        ...other,
      },
    });
    //attach data chemical_material_id and medicine_id in pivot table
    await prisma.medicineChemicalMaterial.createMany({
      data: chemical_materials_ids.map((id) => ({
        chemical_material_id: id,
        medicine_id: medicine.id,
      })),
    });
  }
}
