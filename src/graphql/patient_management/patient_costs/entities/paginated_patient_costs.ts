import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "src/pagination/PaginateResult";
import { PatientCost } from "./patient_cost.entity";

@ObjectType()
export class PaginatedPatientCost extends PaginateResult(PatientCost) { }