import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreatePatientDiseaseInput {
    @Field(() => Int)
    disease_id: number

    @Field(() => Boolean)
    tight: boolean;

    @Field(() => String, { nullable: true })
    notes?: string

    @Field(() => Date, { nullable: true })
    start_date?: Date
}