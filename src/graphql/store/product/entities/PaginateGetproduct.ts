import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "src/pagination/PaginateResult";
import { GetProducts } from "./GetProductsOutput";

@ObjectType()
export class PaginateGetProducts extends PaginateResult(GetProducts) { }