import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "src/pagination/PaginateResult";
import { Disease } from "./disease.entity";

@ObjectType()
export class Paginatedisease extends PaginateResult(Disease){};