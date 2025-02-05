import { ValidatorProps } from 'src/validatior/interfaces/props.interface';
import { checkIfChemicalsExists, checkIfExists } from 'src/validatior/validator';




export async function updateChemical({ id, data, modelName }: ValidatorProps) {

    const checkIfExist = await checkIfExists({ id, modelName });
    if (checkIfExist.fail == false) {
        return checkIfExist;
    }
    const checkIfChemicalExist = await checkIfChemicalsExists({ data });
    if (checkIfChemicalExist.fail == false) {
        return checkIfChemicalExist;
    }

    return { fail: true, }
}

