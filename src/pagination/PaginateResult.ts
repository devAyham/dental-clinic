import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function PaginateResult<T>(ItemType: Type<T>): any {
  @ObjectType()
  class PageClass {
    @Field(() => [ItemType], { nullable: true })
    items: T[];

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    item_per_page: number;

    @Field(() => Int)
    page: number;

    @Field(() => Meta, { nullable: true })
    meta?: Meta;
  }

  return PageClass;
}

@ObjectType()
export class Meta {
  @Field(() => Float, { nullable: true })
  total?: number;
}
