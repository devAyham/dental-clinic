import { ValidatorProps } from 'src/validatior/interfaces/props.interface';
import { checkIfChemicalsExists, checkIfExists } from 'src/validatior/validator';

export async function createDisease({ id, data, modelName }: ValidatorProps) {
  const checkIfChemicalExist = await checkIfChemicalsExists({ data });
  if (checkIfChemicalExist.fail == false) {
    return checkIfChemicalExist;
  }
  return { fail: true };
}

export async function updateDisease({ id, data, modelName }: ValidatorProps) {
  const diseaseIfExist = await checkIfExists({ id, modelName });
  if (diseaseIfExist.fail == false) {
    return diseaseIfExist;
  }

  if (data.chemical_material_id) {
    const checkIfChemicalExist = await checkIfChemicalsExists({ data });
    if (checkIfChemicalExist.fail == false) {
      return checkIfChemicalExist;
    }
  }

  return { fail: true };
}
