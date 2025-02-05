import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LabOrderService } from './lab_order.service';
import { LabOrder } from './entities/lab_order.entity';
import { CreateLabOrderInput } from './dto/create-lab_order.input';
import { UpdateLabOrderInput } from './dto/update-lab_order.input';
import { PaginateLabOrder } from './entities/paginate-lab_order.entity';

@Resolver(() => LabOrder)
export class LabOrderResolver {
  constructor(private readonly labOrderService: LabOrderService) {}

  @Mutation(() => LabOrder )
  createLabOrder(@Args('createLabOrderInput') createLabOrderInput: CreateLabOrderInput) {
    return this.labOrderService.create(createLabOrderInput);
  }

  @Query(() => PaginateLabOrder, { name: 'labOrders' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('search', { nullable: true }) search?: string,
    @Args('item_per_page', { nullable: true }) item_per_page?: number,
    @Args('lab_id', { nullable: true }) lab_id?: number,
  ) {

    const labOrder= await this.labOrderService.findAll(page, item_per_page, search,lab_id);
    return {
      items: labOrder.data,
      totalPages: labOrder.totalPages,
      page: labOrder.page,
      item_per_page: labOrder.item_per_page,
    };
  }

  @Query(() => LabOrder, { name: 'labOrder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.labOrderService.findOne(id);
  }

  @Mutation(() => LabOrder)
  updateLabOrder(
    @Args('id', { type: () => Int }) id: number,
    
    @Args('updateLabOrderInput') updateLabOrderInput: UpdateLabOrderInput) {
    return this.labOrderService.update(id, updateLabOrderInput);
  }

  @Mutation(() => LabOrder)
  removeLabOrder(@Args('id', { type: () => Int }) id: number) {
    return this.labOrderService.remove(id);
  }
}
