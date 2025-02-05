import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "src/pagination/PaginateResult";
import { StoredProduct } from "./stored_product.entity";

@ObjectType()
export class PaginateStoredProduct extends PaginateResult(StoredProduct) { }