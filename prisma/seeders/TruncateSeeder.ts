import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async  function truncateDB() {
  // prisma.chemicalMaterial;
  // prisma.disease.deleteMany();
  // prisma.badHabit.deleteMany();
  // prisma.diseaseChemicalMaterial.deleteMany();
  // prisma.badHabitChemicalMaterial.deleteMany();
  // prisma.chemicalChemicalMaterial.deleteMany();
  // prisma.medicine.deleteMany();
  // prisma.medicineChemicalMaterial.deleteMany();
  // prisma.treatmentType.deleteMany();
  // prisma.treatment.deleteMany();
  // prisma.step.deleteMany();
  // prisma.subStep.deleteMany();
  // prisma.problemType.deleteMany();
  // prisma.user.deleteMany();
  // prisma.patientUser.deleteMany();
  // prisma.role.deleteMany();
  // prisma.category.deleteMany();
  // prisma.patient.deleteMany();
  // prisma.patientDisease.deleteMany();
  // prisma.patientBadHabet.deleteMany();
  // prisma.patientMedicine.deleteMany();
  // prisma.patientMedicalImageType.deleteMany();
  // prisma.patientMedicalImage.deleteMany();
  // prisma.patientCost.deleteMany();
  // prisma.patientPayment.deleteMany();
  // prisma.patientDiagnose.deleteMany();
  // prisma.teeth.deleteMany();
  // prisma.patientTeethTreatment.deleteMany();
  // prisma.product.deleteMany();
  // prisma.bookIn.deleteMany();
  // prisma.storedProduct.deleteMany();
  // prisma.bookOut.deleteMany();
  // prisma.workingHours.deleteMany();
  // prisma.notifications.deleteMany();
  // prisma.patientAppointment.deleteMany();
  // prisma.patientSession.deleteMany();
  // prisma.patientReservation.deleteMany();
  // prisma.patientTreatment.deleteMany();
  // prisma.patientLabOrder.deleteMany();
  // prisma.patientTreatmentDoneStep.deleteMany();
  // prisma.patientPerscrptions.deleteMany();
  // prisma.patientPerscrptionsMedicince.deleteMany()
  // prisma.labOrder.deleteMany();
  await prisma.$queryRaw`SET foreign_key_checks=0`;

  await prisma.$queryRaw`TRUNCATE TABLE diseases_chemical_materials;`;
  await prisma.$queryRaw`TRUNCATE TABLE chemical_materials;`;
  await prisma.$queryRaw`TRUNCATE TABLE bad_habits_chemical_materials;`;
  await prisma.$queryRaw`TRUNCATE TABLE bad_habit;`;
  await prisma.$queryRaw`TRUNCATE TABLE book_ins;`;
  await prisma.$queryRaw`TRUNCATE TABLE book_outs;`;
  await prisma.$queryRaw`TRUNCATE TABLE categories;`;
  await prisma.$queryRaw`TRUNCATE TABLE chemical_materials_chemical_materials;`;
  await prisma.$queryRaw`TRUNCATE TABLE diagnoses;`;
  await prisma.$queryRaw`TRUNCATE TABLE diseases;`;
  await prisma.$queryRaw`TRUNCATE TABLE medical_images;`;
  await prisma.$queryRaw`TRUNCATE TABLE medical_images_types;`;
  await prisma.$queryRaw`TRUNCATE TABLE medicines;`;
  await prisma.$queryRaw`TRUNCATE TABLE medicines_chemical_materials;`;
  await prisma.$queryRaw`TRUNCATE TABLE notifications;`;
  await prisma.$queryRaw`TRUNCATE TABLE patients;`;
  await prisma.$queryRaw`TRUNCATE TABLE patients_badHabits;`;
  await prisma.$queryRaw`TRUNCATE TABLE patients_costs;`;
  await prisma.$queryRaw`TRUNCATE TABLE patients_diseases;`;
  await prisma.$queryRaw`TRUNCATE TABLE patients_medicines;`;
  await prisma.$queryRaw`TRUNCATE TABLE patients_payments;`;
  await prisma.$queryRaw`TRUNCATE TABLE patients_teeth;`;
  await prisma.$queryRaw`TRUNCATE TABLE problem_types;`;
  await prisma.$queryRaw`TRUNCATE TABLE problems;`;
  await prisma.$queryRaw`TRUNCATE TABLE products;`;
  await prisma.$queryRaw`TRUNCATE TABLE roles;`;
  await prisma.$queryRaw`TRUNCATE TABLE steps;`;
  await prisma.$queryRaw`TRUNCATE TABLE PatientAppointment;`;
  await prisma.$queryRaw`TRUNCATE TABLE stored_products;`;
  await prisma.$queryRaw`TRUNCATE TABLE subs_step;`;
  await prisma.$queryRaw`TRUNCATE TABLE teeth;`;
  await prisma.$queryRaw`TRUNCATE TABLE treatments;`;
  await prisma.$queryRaw`TRUNCATE TABLE treatments_types;`;
  await prisma.$queryRaw`TRUNCATE TABLE users;`;
  await prisma.$queryRaw`TRUNCATE TABLE users_patients;`;
  await prisma.$queryRaw`TRUNCATE TABLE PatientLabOrder;`;
  await prisma.$queryRaw`TRUNCATE TABLE PatientPerscrptions;`;
  await prisma.$queryRaw`TRUNCATE TABLE PatientPerscrptionsMedicince;`;
  await prisma.$queryRaw`TRUNCATE TABLE PatientReservation;`;
  await prisma.$queryRaw`TRUNCATE TABLE PatientSession;`;
  await prisma.$queryRaw`TRUNCATE TABLE PatientTreatment;`;
  await prisma.$queryRaw`TRUNCATE TABLE PatientTreatmentDoneStep;`;
  await prisma.$queryRaw`TRUNCATE TABLE WorkingHours;`;
  await prisma.$queryRaw`TRUNCATE TABLE lab_order_steps;`;
  await prisma.$queryRaw`TRUNCATE TABLE lab_orders;`;
  await prisma.$queryRaw`TRUNCATE TABLE labs;`;




  // const table_names = await prisma.$queryRaw<
  //   Array<{ table_name: string }>
  // >`SELECT table_name AS table_name FROM information_schema.tables WHERE table_schema = 'nestapp'`;
  // // console.log(table_names);
  // // await prisma.$queryRaw`DELETE FROM bad_habit;`;

  // for (let i = 0; i < table_names.length; i++) {
  //   const element = table_names[i].table_name;
  //   console.log(element);

  //   //     if (element !== '_prisma_migrations') {
  //   //       try {
  //   //         await prisma.$queryRaw`DELETE FROM `+element;;
  //   //       } catch (error) {
  //   //         console.log({ error });
  // }
  //     }
  //   }
}
