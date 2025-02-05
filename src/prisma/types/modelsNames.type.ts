import { Prisma } from "@prisma/client";

const models = Prisma.dmmf.datamodel.models;
const modelNames = models.map((model): string => model.name.charAt(0).toLowerCase() + model.name.slice(1))

export type ModelsNames = typeof modelNames[number]

