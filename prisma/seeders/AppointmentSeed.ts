import { AppointmentTypes, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedAppointment() {
  const patientReservations = [
    {
      id: 1,
      patient_id: 2,
      date: '2023-08-27T15:00:00.000Z', // Corrected date format
      notes: '',
    },
  ];

  for (let { id, ...rest } of patientReservations) {
    await prisma.patientReservation.upsert({
      where: { id: id },
      update: {},
      create: {
        ...rest,
      },
    });
  }


 

  const appointments = [
    {
      id: 1,
      type: AppointmentTypes.normal,
      date: '2024-09-09T15:00:00.000Z',
      notes: 'هذه نوت ',
      patient_id: 1,
      phase: 'قلع',
      place: '11',
      // state: 'unregisterd',
      // reservation_id: 1,
    
    },
    {
      id: 2,
      type: AppointmentTypes.emergency,
      date: '2024-09-09T15:00:00.000Z',
      notes: '  لل ايميرجنسي هذه نوت ',
      patient_id: 1,
      phase: 'قلع',
      place: '11',
      // state: 'unregisterd',
      // reservation_id: 1,

    },
    {
      id: 3,
      type: AppointmentTypes.waiting,
      date: '2024-09-09T15:00:00.000Z',
      notes: ' nef skdj dfhskjfh asjlfdhkj',
      patient_id: 2,
      phase: 'قلع',
      place: '12',

    },
    {
      id: 4,
      type: AppointmentTypes.external,
      date: '2024-09-09T15:00:00.000Z',
      notes: ' nef skdj dfhskjfh asjlfdhkj',
      patient_id: 2,
      phase: 'قلع',
      place: '12',
      state: 'unregisterd',
   
    },
  
  ];

  for (const { id, ...rest } of appointments) {
    const badHabit = await prisma.patientAppointment.upsert({
      where: { id: id },
      update: {},
      create: {
        ...rest,
        state: 'unregisterd',
      },
    });
  }
}
