import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function Response<T>(ItemType: Type<T>): any {
  @ObjectType()
  class ResponseClass {
    
    @Field(() => ItemType, { nullable: true })
    data: T[];

    @Field(() => Int , { nullable: true ,defaultValue:200})
    status: number;

    @Field(() => String, { nullable: true ,defaultValue:"message"})
    message: string;

  }

  return ResponseClass;
}