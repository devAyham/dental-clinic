import { Props } from 'src/graphql/interfaces/props.interface';
import { checkIfExists } from 'src/graphql/validatior/validator';


export async function createProblem({ id, data, modelName }: Props) {
  const checkIfExist = await checkIfExists({ id: data.problem_type_id, modelName: "problemType" });
  if (checkIfExist.fail == false) {
    return checkIfExist;
  }
  return { fail: true, }
}

export async function updateProblem({ id, data, modelName }: Props) {
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
