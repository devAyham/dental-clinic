import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MedicineService } from './medicine.service';
import { Medicine } from './entities/medicine.entity';
import { CreateMedicineInput } from './dto/create-medicine.input';
import { UpdateMedicineInput } from './dto/update-medicine.input';
import { paginateMedicine } from './entities/paginateMedicine';
import { checkIfExists, validator } from '../../validatior/validator';
import { createMedicine, updateMedicine } from './validation/medicine.validation';
import { Conflict } from './entities/conflict';

@Resolver(() => Medicine)
export class MedicineResolver {
  constructor(private readonly medicineService: MedicineService) { }

  @Mutation(() => Medicine)
  async createMedicine(@Args('createMedicineInput') createMedicineInput: CreateMedicineInput,) {

    await validator(createMedicine)({ data: createMedicineInput })

    return await this.medicineService.create(createMedicineInput);
  }

  @Query(() => paginateMedicine, { name: 'medicines' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('search', { nullable: true }) serach?: string,
    @Args('item_per_page', { nullable: true }) item_per_page?: number,
  ) {
    const medicine = await this.medicineService.findAll(
      page,
      item_per_page,
      serach,
    );
    return {
      items: medicine.data,
      totalPages: medicine.totalPages,
      page: medicine.page,
      item_per_page: medicine.item_per_page,
    };
  }

  @Query(() => Medicine, { name: 'medicine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.medicineService.findOne(id);
  }

  
  @Query(() => Conflict, { name: 'medicineConflicts' })
  medicineConflicts() {
    return this.medicineService.medicineConflicts();
  }

  @Mutation(() => Medicine)
  async updateMedicine(
    @Args('id') id: number,
    @Args('updateMedicineInput') updateMedicineInput: UpdateMedicineInput,
  ) {

    await validator(updateMedicine)({ data: updateMedicineInput, modelName: "medicine", id: id })

    return this.medicineService.update(id, updateMedicineInput);
  }

  @Mutation(() => Medicine)
  async removeMedicine(@Args('id', { type: () => Int }) id: number) {
    await validator(checkIfExists)({ id, modelName:"medicine" })

    return this.medicineService.remove(id);
  }



  
}
