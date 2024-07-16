import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { PaginatedResponseDto } from 'src/dto/paginated-response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PatchCommentDto } from './dto/patch-comment.dto';
import { QueryCommentDto } from './dto/query-comment.dto';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private readonly comment: typeof Comment) {}

  /**
   * Creates a new comment.
   *
   * @param body - The comment data.
   * @returns A promise that resolves to the created comment.
   * @author Jonathan Alvarado
   */
  async create(body: Omit<CreateCommentDto, 'number'>) {
    return await this.comment.create(body);
  }

  /**
   * Deletes a comment by its ID.
   * @param id - The ID of the comment to delete.
   * @returns A promise that resolves to the result of the deletion operation.
   * @author Jonathan Alvarado
   */
  async delete(id: number) {
    return await this.comment.destroy({ where: { id } });
  }

  /**
   * Finds comments based on the provided query parameters.
   *
   * @param query - The query parameters for filtering, pagination, and sorting.
   * @returns A paginated response containing the matching comments.
   * @author Jonathan Alvarado
   */
  async find(query: QueryCommentDto) {
    const { include, limit, order, orderBy, page, ...where } = query;
    const { count: totalCount, rows: data } =
      await this.comment.findAndCountAll({
        include,
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
   * Finds a comment based on the provided query options.
   * @param query - The query options to filter the comment.
   * @returns A promise that resolves to the found comment.
   * @author Jonathan Alvarado
   */
  async findOne(query: FindOptions<Comment>) {
    return await this.comment.findOne(query);
  }

  /**
   * Updates a comment by its ID.
   * @param id - The ID of the comment to update.
   * @param body - The updated comment data.
   * @returns A promise that resolves to the updated comment.
   * @author Jonathan Alvarado
   */
  async patch(id: number, body: PatchCommentDto) {
    return await this.comment.update(body, { where: { id } });
  }

  /**
   * Updates a comment by its ID.
   *
   * @param id - The ID of the comment to update.
   * @param body - The updated comment data.
   * @returns A promise that resolves to the updated comment.
   * @author Jonathan Alvarado
   */
  async update(id: number, body: Omit<CreateCommentDto, 'number'>) {
    return await this.comment.update(body, { where: { id } });
  }
}
