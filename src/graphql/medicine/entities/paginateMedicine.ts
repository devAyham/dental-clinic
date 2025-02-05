import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'src/pagination/PaginateResult';
import { Medicine } from './medicine.entity';


@ObjectType()
export class paginateMedicine extends PaginateResult(Medicine) {}

