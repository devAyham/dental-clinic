import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientPaymentsService } from './patient_payments.service';
import { PatientPayment } from './entities/patient_payment.entity';
import { CreatePatientPaymentInput } from './dto/create-patient_payment.input';
import { UpdatePatientPaymentInput } from './dto/update-patient_payment.input';
import { PateintPaymentSortInput } from './dto/sort-input';
import { PaginatedPatientPayment } from './entities/paginated_patient_payments';

@Resolver(() => PatientPayment)
export class PatientPaymentsResolver {
  constructor(private readonly patientPaymentsService: PatientPaymentsService) { }

  @Mutation(() => PatientPayment)
  createPatientPayment(@Args('createPatientPaymentInput') createPatientPaymentInput: CreatePatientPaymentInput) {
    return this.patientPaymentsService.create(createPatientPaymentInput);
  }

  @Query(() => PaginatedPatientPayment, { name: 'patientPayments' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('item_per_page', { nullable: true }) item_per_page?: number,
    @Args('patient_id', { type: () => Int, nullable: true }) patient_id?: number,
    @Args('sort', { type: () => PateintPaymentSortInput, nullable: true }) sort?: PateintPaymentSortInput
  ) {
    const data = await this.patientPaymentsService.findAll({ patient_id, sort, item_per_page, page });

    return data
  }

  // @Query(() => PatientPayment, { name: 'patientPayment' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.patientPaymentsService.findOne(id);
  // }

  @Mutation(() => PatientPayment)
  updatePatientPayment(@Args('updatePatientPaymentInput') updatePatientPaymentInput: UpdatePatientPaymentInput) {
    return this.patientPaymentsService.update(updatePatientPaymentInput.id, updatePatientPaymentInput);
  }

  @Mutation(() => PatientPayment)
  removePatientPayment(@Args('id', { type: () => Int }) id: number) {
    return this.patientPaymentsService.remove(id);
  }
}
