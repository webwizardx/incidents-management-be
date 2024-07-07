import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_BEARER_AUTH } from 'src/constants';
import { CheckPolicies } from 'src/modules/permissions/decorators/check-policies.decorator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PatchCategoryDto } from './dto/patch-category.dto';
import { QueryCategoryDto } from './dto/query-category.dto';
import {
  CreateCategoryPolicyHandler,
  DeleteCategoryPolicyHandler,
  ReadCategoryPolicyHandler,
  UpdateCategoryPolicyHandler,
} from './policies';

@ApiBearerAuth(API_BEARER_AUTH)
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({
    description: 'This endpoint is used to create a category',
    summary: 'Create a category',
  })
  @CheckPolicies(new CreateCategoryPolicyHandler())
  @Post()
  /**
   * Creates a new category.
   * @param body - The data for creating the category.
   * @returns The created category.
   * @author Jonathan Alvarado
   */
  async create(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create(body);
  }

  @ApiOperation({
    description: 'This endpoint is used to get a list of categories',
    summary: 'Get a list of categories',
  })
  @CheckPolicies(new ReadCategoryPolicyHandler())
  @Get()
  /**
   * Finds categories based on the provided query.
   *
   * @param query - The query parameters for filtering categories.
   * @returns A Promise that resolves to the found categories.
   * @author Jonathan Alvarado
   */
  async find(@Query() query: QueryCategoryDto) {
    return this.categoriesService.find(query);
  }

  @ApiOperation({
    description: 'This endpoint is used to get a category by its ID',
    summary: 'Get a category by its ID',
  })
  @CheckPolicies(new ReadCategoryPolicyHandler())
  @Get(':id')
  /**
   * Finds a category by its ID.
   * @param id - The ID of the category.
   * @returns The found category.
   * @throws NotFoundException if the category with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoriesService.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  @ApiOperation({
    description: 'This endpoint is used to update a category',
    summary: 'Update a category',
  })
  @CheckPolicies(new UpdateCategoryPolicyHandler())
  @Patch(':id')
  /**
   * Updates a category by applying the changes specified in the `body` parameter.
   * Throws a NotFoundException if the category with the specified `id` is not found.
   *
   * @param id - The ID of the category to update.
   * @param body - The changes to apply to the category.
   * @returns The updated category.
   * @throws NotFoundException - If the category with the specified `id` is not found.
   *
   * @author Jonathan Alvarado
   */
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PatchCategoryDto
  ) {
    const category = await this.categoriesService.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.categoriesService.patch(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to update a category',
    summary: 'Update a category',
  })
  @CheckPolicies(new UpdateCategoryPolicyHandler())
  @Put(':id')
  /**
   * Updates a category by its ID.
   *
   * @param id - The ID of the category to update.
   * @param body - The updated category data.
   * @returns The updated category.
   * @throws NotFoundException if the category with the specified ID is not found.
   *
   * @author Jonathan Alvarado
   */
  async put(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateCategoryDto
  ) {
    const category = await this.categoriesService.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.categoriesService.update(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to delete a category',
    summary: 'Delete a category',
  })
  @CheckPolicies(new DeleteCategoryPolicyHandler())
  @Delete(':id')
  /**
   * Deletes a category by its ID.
   *
   * @param id - The ID of the category to delete.
   * @returns A Promise that resolves to the deleted category.
   * @throws NotFoundException if the category with the specified ID is not found.
   *
   * @author Jonathan Alvarado
   */
  async delete(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoriesService.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.categoriesService.delete(id);
  }
}
