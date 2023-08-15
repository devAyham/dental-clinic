import { Props } from 'src/graphql/interfaces/props.interface';
import { checkIfExists } from 'src/validatior/validator';


export async function createTreatment({ id, data, modelName }: Props) {
  const checkIfExist = await checkIfExists({ id: data.treatment_type_id, modelName: "treatmentType" });
  if (checkIfExist.fail == false) {
    return checkIfExist;
  }
  return { fail: true, }
}

export async function updateTreatment({ id, data, modelName }: Props) {
  const treatmentIfExist = await (checkIfExists)({ id, modelName })
  if (treatmentIfExist.fail == false) {
    return treatmentIfExist;
  }
  if (data.treatment_type_id) {
    const checkIfExist = await checkIfExists({ id: data.treatment_type_id, modelName: "treatmentType" });
    if (checkIfExist.fail == false) {
      return checkIfExist;
    }
    return { fail: true, }
}

}