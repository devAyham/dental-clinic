import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "src/pagination/PaginateResult";
import { BookOut } from "./book_out.entity";

@ObjectType()
export class Paginatebookout extends PaginateResult(BookOut){};