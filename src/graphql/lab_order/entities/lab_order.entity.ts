import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Lab } from 'src/graphql/lab/entities/lab.entity';
import { LabOrderStep } from './lab_order-step.entity';

@ObjectType()
export class LabOrder {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  price: string;

  @Field(() => Int)
  lab_id: number;

  @Field(() => Lab, { nullable: true })
  lab?: Lab;

  @Field(() => [LabOrderStep], { nullable: true })
  LabOrderStep?: LabOrderStep[];
}
