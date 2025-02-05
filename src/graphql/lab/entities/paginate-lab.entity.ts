import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "src/pagination/PaginateResult";
import { Lab } from "./lab.entity";

@ObjectType()
export class PaginateLab extends PaginateResult(Lab){};