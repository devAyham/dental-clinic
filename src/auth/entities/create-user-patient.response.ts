import { ObjectType } from '@nestjs/graphql';
import { Response } from 'src/global/response-entity';
import { CreateUserPatient } from './create-user-patient.entitiy';


@ObjectType()
export class CreateUserPatientResponse extends Response(CreateUserPatient) {}

