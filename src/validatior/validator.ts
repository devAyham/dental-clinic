
import { GraphQLError } from 'graphql';
import { ValidatorProps } from './interfaces/props.interface';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const validator = ((func) => {
    return async (props?: ValidatorProps) => {
        const resault = await func(props);
        if (resault.fail == false) {
            throw new GraphQLError(resault.msg, { extensions: { code: resault.status }, });
        }
        return
    }
});



export async function checkIfExists(props: ValidatorProps) {

    const model = await prisma[props.modelName].findFirst({ where: { id: props.id }, })
    if (!model) {
        return {
            fail: false,
            msg: `${props.modelName} not found`,
            status: 404
        }
    }
    return { fail: true, }
}

export async function checkIfChemicalsExists({ data }: ValidatorProps) {

    if (data.chemical_material_id) {
        // check if All sended chemical_material ids exists in chemical_materials table
        const chemical_material_count = await prisma.chemicalMaterial.count({ where: { id: { in: data.chemical_material_id } } });
        if (chemical_material_count != data.chemical_material_id.length)
            return {
                fail: false,
                msg: `chemical_material_ids sended not found in database `,
                status: 404
            }
    }
    return {
        fail: true,
    }
}
