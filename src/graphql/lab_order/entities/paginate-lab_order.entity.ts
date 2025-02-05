import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "src/pagination/PaginateResult";
import { LabOrder } from "./lab_order.entity";

@ObjectType()
export class PaginateLabOrder extends PaginateResult(LabOrder){};