import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "src/pagination/PaginateResult";
import { BookIn } from "./book_in.entity";

@ObjectType()
export class Paginatebookin extends PaginateResult(BookIn){};