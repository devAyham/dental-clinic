import { ObjectType } from '@nestjs/graphql';
import { Problem } from './problem.entity';
import { PaginateResult } from 'src/pagination/PaginateResult';

@ObjectType()
export class PaginateProblem extends PaginateResult(Problem) {}