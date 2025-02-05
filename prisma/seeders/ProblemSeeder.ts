import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedProblemType() {
  const problemTypes = [
    {
      id: 1,
      name: 'نوع المشكلة الاولى ',
    },
    {
      id: 2,
      name: 'نوع المشكلة الثانية ',
    },
    {
      id: 3,
      name: 'نوع المشكلة الثالثة ',
    },
  ];

  for (const { id, name } of problemTypes) {
    const problemType = await prisma.problemType.upsert({
      where: { id },
      update: {},
      create: {
        name,
      },
    });
  }
}

export async function seedProblem() {
  const problems = [
    {
      id: 1,
      name: ' المشكلة الاولى ',
      problem_type_id: 1,
    },
    {
      id: 2,
      name: ' المشكلة الثانية ',
      problem_type_id: 2,
    },
    {
      id: 3,
      name: ' المشكلة الثالثة ',
      problem_type_id: 3,
    },
  ];

  for (const { id, ...rest } of problems) {
    const problem = await prisma.problem.upsert({
      where: { id },
      update: {},
      create: {
        
        ...rest,
      },
    });
  }
}
