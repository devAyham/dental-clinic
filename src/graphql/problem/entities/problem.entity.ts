import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProblemType } from 'src/graphql/problem_type/entities/problem_type.entity';

@ObjectType()
export class Problem {
  @Field(() => Int, { description: 'problem id' })
  id: number;

  @Field(() => String, { description: 'problem name' })
  name: string;

  @Field(() => Int, { description: 'problem_type_id id' })
  problem_type_id: number;

  @Field(() => ProblemType, { description: 'Problem_type' })
  Problem_type: ProblemType;
}
