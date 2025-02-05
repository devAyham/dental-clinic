import { CreateLabOrderInput } from './create-lab_order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLabOrderInput extends PartialType(CreateLabOrderInput) {
  
}
