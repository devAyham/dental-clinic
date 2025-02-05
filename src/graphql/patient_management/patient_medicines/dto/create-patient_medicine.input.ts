import { InputType, Int, Field } from '@nestjs/graphql';



@InputType()
export class CreatePatientMedicineInput {
  @Field(() => Int)
  medicine_id: number

  @Field(() => String, { nullable: true })
  notes?: string

  @Field(() => Date, { nullable: true })
  start_date?: Date
}