import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "src/pagination/PaginateResult";
import { BadHabit } from "./bad_habit.entity";

@ObjectType()
export class Paginatebadhabit extends PaginateResult(BadHabit){};