import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "src/pagination/PaginateResult";
import { Patient } from "./patient.entity";

@ObjectType()
export class PaginatedPatient extends PaginateResult(Patient) {}