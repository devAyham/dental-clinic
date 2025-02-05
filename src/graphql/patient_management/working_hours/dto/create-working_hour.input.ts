import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { Days } from '@prisma/client';

registerEnumType(Days, {
  name: 'Days',
});
@InputType()
export class CreateWorkingHourInput {
  @Field(() => Days, { description: 'Sun, Mon, Tue, Wed, Thu, Fri, Sat' })
  day: Days;

  @Field(() => Date)
  from: Date;

  @Field(() => Date)
  to: Date;

  @Field(() => Boolean)
  open: boolean;
}
