import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LabService } from './lab.service';
import { Lab } from './entities/lab.entity';
import { CreateLabInput } from './dto/create-lab.input';
import { UpdateLabInput } from './dto/update-lab.input';
import { PaginateLab } from './entities/paginate-lab.entity';

@Resolver(() => Lab)
export class LabResolver {
  constructor(private readonly labService: LabService) {}

  @Mutation(() => Lab)
  async createLab(@Args('createLabInput') createLabInput: CreateLabInput) {
    return await this.labService.create(createLabInput);
  }

  @Query(() => PaginateLab, { name: 'labs' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('search', { nullable: true }) search?: string,
    @Args('item_per_page', { nullable: true }) item_per_page?: number,

  ) {
    const lab=  await this.labService.findAll(page, item_per_page, search);
    return {
      items: lab.data,
      totalPages: lab.totalPages,
      page: lab.page,
      item_per_page: lab.item_per_page,
    };
  }

  @Query(() => Lab, { name: 'lab' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.labService.findOne(id);
  }

  @Mutation(() => Lab)
  async updateLab(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateLabInput') updateLabInput: UpdateLabInput
    ) {
    return await  this.labService.update(id , updateLabInput);
  }

  @Mutation(() => Lab)
  async removeLab(@Args('id', { type: () => Int }) id: number) {
    return await this.labService.remove(id);
  }
}
