import { PrismaClient } from '@prisma/client';
import {
  checkConflictsByIds,
  getAllPossiblePairs,
} from 'src/graphql/chemical_material/ChemicalHelper';
import { ValidatorProps } from 'src/validatior/interfaces/props.interface';
import {
  checkIfChemicalsExists,
  checkIfExists,
} from 'src/validatior/validator';

const prisma = new PrismaClient();

export async function checkConflicts({ data }: ValidatorProps) {
  
  const results = await checkConflictsByIds(data.chemical_material_id);

  const newString = results.map(
    (item) =>
      `${item.chemical_material_1.name} have conflict with ${item.chemical_material_2.name}`,
  );

  if (results.length > 0) {
    return {
      fail: false,
      msg: newString,
      status: 400,
    };
  }

  return {
    fail: true,
  };
}

export async function createMedicine({ id, data, modelName }: ValidatorProps) {
  const checkIfExist = await checkIfExists({
    id: data.category_id,
    modelName: 'category',
  });
  if (checkIfExist.fail == false) {
    return checkIfExist;
  }

  const checkIfChemicalExist = await checkIfChemicalsExists({ data });
  if (checkIfChemicalExist.fail == false) {
    return checkIfChemicalExist;
  }

  const checkConflict = await checkConflicts({ data });
  if (checkConflict.fail == false) {
    return checkConflict;
  }

  return { fail: true };
}

export async function updateMedicine({ id, data, modelName }: ValidatorProps) {
  const medicineIfExist = await checkIfExists({ id, modelName });
  if (medicineIfExist.fail == false) {
    return medicineIfExist;
  }

  if (data.category_id) {
    const categoryIfExist = await checkIfExists({
      id: data.category_id,
      modelName: 'category',
    });
    if (categoryIfExist.fail == false) {
      return categoryIfExist;
    }
  }

  if (data.chemical_material_id) {
    const checkIfChemicalExist = await checkIfChemicalsExists({ data });
    if (checkIfChemicalExist.fail == false) {
      return checkIfChemicalExist;
    }
  }

  const checkConflict = await checkConflicts({ data });
  if (checkConflict.fail == false) {
    return checkConflict;
  }

  return { fail: true };
}
