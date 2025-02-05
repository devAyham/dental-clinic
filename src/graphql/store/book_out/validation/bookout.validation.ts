import { ValidatorProps } from "src/validatior/interfaces/props.interface";
import { Prisma, PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function checkIfStoredProductExists({ data }: ValidatorProps) {

    if (data.stored_product_id) {
        // check if All sended stored_products ids exists in stored_product table
        const stored_product_count = await prisma.storedProduct.count({ where: { id: { in: data.stored_product_id } } });
        if (stored_product_count != data.stored_product_id.length)
            return {
                fail: false,
                msg: `stored_product_ids sended not found in database `,
                status: 404
            }
    }
    return {
        fail: true,
    }
}