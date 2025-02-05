import { ObjectType } from '@nestjs/graphql';
import { Treatment } from './treatment.entity';
import { PaginateResult } from 'src/pagination/PaginateResult';

@ObjectType()
export class paginateTreatment extends PaginateResult(Treatment) {}