import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "src/pagination/PaginateResult";
import { Product } from "./product.entity";

@ObjectType()
export class Paginateproduct extends PaginateResult(Product){}