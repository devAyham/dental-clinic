import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

const prisma = new PrismaClient();

// send array of ids and return all possible pairs of ids
export function getAllPossiblePairs(arr) {
  const pairs = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }

  return pairs;
}

// send array of medicine ids and return all chemical materials ids
//used to send pair of medicine and get there  chemical materials ids
export async function getChemicalMaterialFromMedicines(
  medicineArray: number[],
): Promise<number[]> {
  let medicine_chemical_materials =
    await prisma.medicineChemicalMaterial.findMany({
      where: {
        medicine_id: { in: medicineArray },
      },
      select: {
        chemical_material_id: true,
      },
    });
  const convertedArray = medicine_chemical_materials.map((item) => {
    return item.chemical_material_id;
  });
  return convertedArray;
}

// to send array of chemical material ids and check if there is conflicts , used in create medicine
export async function checkConflictsByIds(ids: number[]) {
  const pairs = getAllPossiblePairs(ids);

  const results = await Promise.all(
    pairs.map(async (pair) => {
      const [id1, id2] = pair;
      const data = await prisma.chemicalChemicalMaterial.findMany({
        where: {
          OR: [
            { chemical_material_1_id: id1, chemical_material_2_id: id2 },
            { chemical_material_1_id: id2, chemical_material_2_id: id1 },
          ],
        },
        include: {
          chemical_material_1: true,
          chemical_material_2: true,
        },
      });

      return data.length > 0 ? data : null;
    }),
  );
  const realData = results.filter((d) => d !== null).flat();

  return realData;
}

// send array of medicant_id and
//return array of  object have name of two medicant have conflict (pair_of_medicine) , and message have array of conflict between chemical material
export async function checkConflictsByMedicinesIds(ids: number[]) {
  //  ids= [1,2,3]

  // MedicinesPairs= [[1,2] [1,3] ,[1,3]]
  var MedicinesPairs = getAllPossiblePairs(ids);

  let array_of_conflicts_between_all_medicines = [];

  for (let i = 0; i < MedicinesPairs.length; i++) {
    //MedicinesPairs[i] =[1,2]

    var chemical_materials_in_pair_of_medicine =
      await getChemicalMaterialFromMedicines(MedicinesPairs[i]);
    //chemical_materials_in_pair_of_medicine = [1,23,245,523,32]

    const realData = await checkConflictsByIds(
      chemical_materials_in_pair_of_medicine,
    );
    // info of chemical  material that have conflicts

    if (realData.length == 0) {
      continue;
    }

    const conflict_in_chemicals_of_pair_of_medicine = realData.map(
      (item) =>
        `${item.chemical_material_1.name} have conflict with ${item.chemical_material_2.name}`,
    );

    let medicine_name_array = await getMedicinesNameByIds(MedicinesPairs[i]);

    array_of_conflicts_between_all_medicines.push({
      pair_of_medicine: medicine_name_array.toString(),
      message: conflict_in_chemicals_of_pair_of_medicine,
    });
  }

  array_of_conflicts_between_all_medicines =
    array_of_conflicts_between_all_medicines.filter((i) => {
      if (i.message.length > 0) return i;
    });
  return array_of_conflicts_between_all_medicines;
}

export async function Conflict_bad_habit_Medicine(
  medicines_ids: number[],
  bad_habit_ids: number[],
) {
  const all_conflicts = [];
  for (let k = 0; k < bad_habit_ids.length; k++) {
    for (let i = 0; i < medicines_ids.length; i++) {
      let chemical_material_ids_in_medicine =
        await getChemicalMaterialFromMedicines([medicines_ids[i]]);

      let x = await prisma.badHabitChemicalMaterial.findMany({
        where: {
          bad_habit_id: bad_habit_ids[k],
          chemical_material_id: {
            in: chemical_material_ids_in_medicine,
          },
        },
        include: {
          chemical_material: true,
          disease: true,
        },
      });

      const conflict_in_chemical_with_bad = x.map(
        (item) =>
          `${item.chemical_material.name} have conflict with ${item.disease.name}`,
      );

      if (conflict_in_chemical_with_bad.length > 0) {
        var medicant_name = await getMedicinesNameByIds([medicines_ids[i]]);
        all_conflicts.push({
          conflict_in_chemicals: conflict_in_chemical_with_bad,
          medicant_name: medicant_name.toString(),
        });
      }
    }
  }
  return all_conflicts;
}

export async function Conflict_Diseases_Medicine(
  medicines_ids: number[],
  diseases_ids: number[],
) {
  const all_conflicts = [];
  for (let k = 0; k < diseases_ids.length; k++) {
    for (let i = 0; i < medicines_ids.length; i++) {
      let chemical_material_ids_in_medicine =
        await getChemicalMaterialFromMedicines([medicines_ids[i]]);

      let x = await prisma.diseaseChemicalMaterial.findMany({
        where: {
          disease_id: diseases_ids[k],
          chemical_material_id: {
            in: chemical_material_ids_in_medicine,
          },
        },
        include: {
          chemical_material: true,
          disease: true,
        },
      });

      const conflict_in_chemical_with_disease = x.map(
        (item) =>
          `${item.chemical_material.name} have conflict with ${item.disease.name}`,
      );

      if (conflict_in_chemical_with_disease.length > 0) {
        var medicant_name = await getMedicinesNameByIds([medicines_ids[i]]);
        all_conflicts.push({
          conflict_in_chemicals: conflict_in_chemical_with_disease,
          medicant_name: medicant_name.toString(),
        });
      }
    }
  }
  return all_conflicts;
}

export async function getMedicinesNameByIds(medicant_ids: number[]) {
  var medicines = await prisma.medicine.findMany({
    where: {
      id: {
        in: medicant_ids,
      },
    },
    select: { name: true },
  });
  var medicine_name_array = medicines.map((medicine) => {
    return medicine.name;
  });
  return medicine_name_array;
}

export async function getPatientMedicinesIds(patient_id: number) {
  var patient_medicines = await prisma.patientMedicine.findMany({
    where: {
      patient_id,
    },
    select: {
      medicine_id: true,
    },
  });

  return patient_medicines.map((patient_medicine) => {
    return patient_medicine.medicine_id;
  });
}

export async function getPatientDiseasesIds(patient_id: number) {
  var patientDiseases = await prisma.patientDisease.findMany({
    where: {
      patient_id,
    },
    select: {
      disease_id: true,
    },
  });

  return patientDiseases.map((patient_disease) => {
    return patient_disease.disease_id;
  });
}

export async function getPatientBadHabitIds(patient_id: number) {
  var patient_bad_habits = await prisma.patientBadHabet.findMany({
    where: {
      patient_id,
    },
    select: {
      bad_habet_id: true,
    },
  });

  return patient_bad_habits.map((patient_disease) => {
    return patient_disease.bad_habet_id;
  });
}
