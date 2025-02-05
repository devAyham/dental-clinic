import { ObjectType, Field} from '@nestjs/graphql';

@ObjectType()
export class CheckPhone {
  @Field(() => Boolean)
  phoneHaveUserAccount: boolean;

  @Field(() => Boolean)
  phoneHavePatient: boolean;

  @Field(() => Number)
  code :number 

  @Field(() => String)
  message :string 
  



}
