import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientLabOrdersService } from './patient_lab_orders.service';
import { PatientLabOrder } from './entities/patient_lab_order.entity';
import { CreatePatientLabOrderInput } from './dto/create-patient_lab_order.input';
import { UpdatePatientLabOrderInput } from './dto/update-patient_lab_order.input';

@Resolver(() => PatientLabOrder)
export class PatientLabOrdersResolver {
  constructor(private readonly patientLabOrdersService: PatientLabOrdersService) { }

  @Mutation(() => PatientLabOrder)
  createPatientLabOrder(@Args('createPatientLabOrderInput') createPatientLabOrderInput: CreatePatientLabOrderInput) {
    return this.patientLabOrdersService.create(createPatientLabOrderInput);
  }

  @Query(() => [PatientLabOrder], { name: 'patientLabOrders' })
  findAll(@Args('lab_order_id', { type: () => Int, nullable: true }) lab_order_id?: number,
    @Args('patient_id', { type: () => Int, nullable: true }) patient_id?: number,
    @Args('patient_session_id', { type: () => Int, nullable: true }) patient_session_id?: number) {
    return this.patientLabOrdersService.findAll({
      lab_order_id, patient_id, patient_session_id
    });
  }

  @Query(() => PatientLabOrder, { name: 'patientLabOrder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.patientLabOrdersService.findOne(id);
  }

  @Mutation(() => PatientLabOrder)
  updatePatientLabOrder(@Args('updatePatientLabOrderInput') updatePatientLabOrderInput: UpdatePatientLabOrderInput) {
    return this.patientLabOrdersService.update(updatePatientLabOrderInput.id, updatePatientLabOrderInput);
  }

  @Mutation(() => PatientLabOrder)
  removePatientLabOrder(@Args('id', { type: () => Int }) id: number) {
    return this.patientLabOrdersService.remove(id);
  }
}
