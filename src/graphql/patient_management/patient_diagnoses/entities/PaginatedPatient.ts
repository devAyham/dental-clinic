import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "src/pagination/PaginateResult";
import { PatientDiagnosis } from "./patient_diagnosis.entity";

@ObjectType()
export class PaginatedPatientDiagnosis extends PaginateResult(PatientDiagnosis) { }