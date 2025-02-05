import { Days, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedWorkingHour() {
  const workingHours = [
    {
      id: 1,
      day: Days.Sun,
      from: '1970-01-01T10:00:00.000Z',
      to: '1970-01-01T16:00:00.000Z',
      open: true,
    },
    {
      id: 2,
      day: Days.Mon,
      from: '1970-01-01T10:00:00.000Z',
      to: '1970-01-01T16:00:00.000Z',
      open: true,
    },
    {
      id: 3,
      day: Days.Tue,
      from: '1970-01-01T10:00:00.000Z',
      to: '1970-01-01T16:00:00.000Z',
      open: true,
    },

    {
      id: 4,
      day: Days.Wed,
      from: '1970-01-01T10:00:00.000Z',
      to: '1970-01-01T16:00:00.000Z',
      open: true,
    },
    {
      id: 5,
      day: Days.Thu,
      from: '1970-01-01T10:00:00.000Z',
      to: '1970-01-01T16:00:00.000Z',
      open: true,
    },
    {
      id: 6,
      day: Days.Fri,
      from: '1970-01-01T10:00:00.000Z',
      to: '1970-01-01T16:00:00.000Z',
      open: true,
    },
    {
      id: 7,
      day: Days.Sat,
      from: '1970-01-01T10:00:00.000Z',
      to: '1970-01-01T16:00:00.000Z',
      open: true,
    },
  ];
  await prisma.$queryRaw`TRUNCATE TABLE WorkingHours;`;

  for (const { id, from, to, day, open } of workingHours) {
    await prisma.workingHours.create({
      data: {
        day,
        from,
        open,
        to,
      },
    });
  }
}
