import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SendOtp {
    @Field(() => Int, { description: 'Example field (placeholder)' })
    otp?: number;
}
