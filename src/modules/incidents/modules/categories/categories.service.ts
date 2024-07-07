import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { PaginatedResponseDto } from 'src/dto/paginated-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PatchCategoryDto } from './dto/patch-category.dto';
import { QueryCategoryDto } from './dto/query-category.dto';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly category: typeof Category
  ) {}

  /**
   * Creates a new category.
   *
   * @param body - The data for creating the category, excluding the 'number' field.
   * @returns A Promise that resolves to the created category.
   * @author Jonathan Alvarado
   */
  async create(body: Omit<CreateCategoryDto, 'number'>) {
    return await this.category.create(body);
  }

  /**
   * Deletes a category by its ID.
   *
   * @param id - The ID of the category to delete.
   * @returns A promise that resolves to the result of the deletion operation.
   * @author Jonathan Alvarado
   */
  async delete(id: number) {
    return await this.category.destroy({ where: { id } });
  }

  /**
   * Finds categories based on the provided query parameters.
   * @param query - The query parameters for filtering categories.
   * @returns A paginated response containing the found categories.
   * @author Jonathan Alvarado
   */
  async find(query: QueryCategoryDto) {
    const { limit, order, orderBy, page, ...where } = query;
    const { count: totalCount, rows: data } =
      await this.category.findAndCountAll({
        limit,
        order: [[orderBy, order]],
        offset: (page - 1) * limit,
        where,
      });

    return new PaginatedResponseDto({
      data,
      limit,
      page,
      order,
      orderBy,
      totalCount,
    });
  }

  /**
   * Finds a single category based on the provided query options.
   * @param query - The query options to filter the category.
   * @returns A promise that resolves to the found category.
   * @author Jonathan Alvarado
   */
  async findOne(query: FindOptions<Category>) {
    return await this.category.findOne(query);
  }

  /**
   * Updates a category by applying the provided changes.
   * @param id - The ID of the category to update.
   * @param body - The changes to apply to the category.
   * @returns A promise that resolves to the updated category.
   * @author Jonathan Alvarado
   */
  async patch(id: number, body: PatchCategoryDto) {
    return await this.category.update(body, { where: { id } });
  }

  /**
   * Updates a category with the specified ID.
   *
   * @param id - The ID of the category to update.
   * @param body - The updated category data.
   * @returns A promise that resolves to the updated category.
   *
   * @author Jonathan Alvarado
   */
  async update(id: number, body: Omit<CreateCategoryDto, 'number'>) {
    return await this.category.update(body, { where: { id } });
  }
}
