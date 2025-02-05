import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLabInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  address: string;
}
