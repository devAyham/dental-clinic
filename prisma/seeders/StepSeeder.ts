import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedSubStep() {
  const subSteps = [
    {
      id: 1,
      name: 'sub step 1 ',
      step_id: 1,
    },
    {
      id: 2,
      name: 'sub step 2',
      step_id: 1,
    },
    {
      id: 3,
      name: 'sub step 3',
      step_id: 1,
    },

    {
      id: 4,
      name: 'sub step 1 for step2 ',
      step_id: 2,
    },
    {
      id: 5,
      name: 'sub step 2 for step2',
      step_id: 2,
    },
    {
      id: 6,
      name: 'sub step 3 for step3',
      step_id: 3,
    },
  ];

  for (const { id, name, step_id } of subSteps) {
    await prisma.subStep.upsert({
      where: { id },
      update: {},
      create: {
        name,
        step_id,
      },
    });
  }
}

export async function seedStep() {
  const subSteps = [
    {
      id: 1,
      name: 'step 1 for treatment_1  ',
      treatment_id: 1,
    },
    {
      id: 2,
      name: 'step 2 for treatment_1',
      treatment_id: 1,
    },
    {
      id: 3,
      name: 'step 1 for treatment_2',
      treatment_id: 2,
    },
    {
      id: 4,
      name: 'step 2 for treatment_2',
      treatment_id: 2,
    },
    {
      id: 5,
      name: 'step 1 for treatment_3',
      treatment_id: 3,
    },
    {
      id: 6,
      name: 'step 1 for treatment_4',
      treatment_id: 4,
    },
  ];

  for (const { id, name, treatment_id } of subSteps) {
    await prisma.step.upsert({
      where: { id },
      update: {},
      create: {
        treatment_id,
        name,
      },
    });
  }
}
