import { ModelsNames } from "src/prisma/types/modelsNames.type";

export interface ValidatorProps {
    id?: number,
    data?: any,
    modelName?: ModelsNames
}