import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "src/pagination/PaginateResult";
import { PatientPayment } from "./patient_payment.entity";

@ObjectType()
export class PaginatedPatientPayment extends PaginateResult(PatientPayment) { }