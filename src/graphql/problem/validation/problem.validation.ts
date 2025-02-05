import { ValidatorProps } from 'src/validatior/interfaces/props.interface';
import { checkIfExists } from 'src/validatior/validator';


export async function createProblem({ id, data, modelName }: ValidatorProps) {
  const checkIfExist = await checkIfExists({ id: data.problem_type_id, modelName: "problemType" });
  if (checkIfExist.fail == false) {
    return checkIfExist;
  }
  return { fail: true, }
}

export async function updateProblem({ id, data, modelName }: ValidatorProps) {
  const problemIfExist = await (checkIfExists)({ id, modelName })
  if (problemIfExist.fail == false) {
    return problemIfExist;
  }
  if (data.problem_type_id) {
    const checkIfExist = await checkIfExists({ id: data.problem_type_id, modelName: "problemType" });
    if (checkIfExist.fail == false) {
      return checkIfExist;
    }
  }
  return { fail: true, }
}

