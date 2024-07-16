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
import { ReadStatusPolicyHandler } from '../status/policies';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PatchCommentDto } from './dto/patch-comment.dto';
import { QueryCommentDto } from './dto/query-comment.dto';
import { CreateCommentPolicyHandler } from './policies';
import {
  DeleteCommentPolicyHandler,
  ReadCommentPolicyHandler,
  UpdateCommentPolicyHandler,
} from './policies/index';

@ApiBearerAuth(API_BEARER_AUTH)
@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    description: 'This endpoint is used to create a comment',
    summary: 'Create a comment',
  })
  @CheckPolicies(new CreateCommentPolicyHandler())
  @Post()
  /**
   * Creates a new comment.
   *
   * @param body - The data for creating the comment.
   * @returns A Promise that resolves to the created comment.
   * @author Jonathan Alvarado
   */
  async create(@Body() body: CreateCommentDto) {
    return this.commentsService.create(body);
  }

  @ApiOperation({
    description: 'This endpoint is used to get comments',
    summary: 'Get comments',
  })
  @CheckPolicies(new ReadCommentPolicyHandler())
  @Get()
  /**
   * Finds comments based on the provided query parameters.
   *
   * @param query - The query parameters for finding comments.
   * @returns A Promise that resolves to the found comments.
   * @author Jonathan Alvarado
   */
  async find(@Query() query: QueryCommentDto) {
    return this.commentsService.find(query);
  }

  @ApiOperation({
    description: 'This endpoint is used to get a comment',
    summary: 'Get a comment',
  })
  @CheckPolicies(new ReadStatusPolicyHandler())
  @Get(':id')
  /**
   * Finds a comment by its ID.
   * @param id - The ID of the comment to find.
   * @returns The found comment.
   * @throws NotFoundException if the comment with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentsService.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return comment;
  }

  @ApiOperation({
    description: 'This endpoint is used to partially update a comment',
    summary: 'Update a comment',
  })
  @CheckPolicies(new UpdateCommentPolicyHandler())
  @Patch(':id')
  /**
   * Updates a comment by applying the changes specified in the `body` parameter.
   * Throws a NotFoundException if the comment with the specified `id` is not found.
   *
   * @param id - The ID of the comment to update.
   * @param body - The data containing the changes to apply to the comment.
   * @returns A Promise that resolves to the updated comment.
   * @throws NotFoundException if the comment with the specified `id` is not found.
   * @author Jonathan Alvarado
   */
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PatchCommentDto
  ) {
    const comment = await this.commentsService.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return this.commentsService.patch(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to update a comment',
    summary: 'Update a comment',
  })
  @CheckPolicies(new UpdateCommentPolicyHandler())
  @Put(':id')
  /**
   * Updates a comment by its ID.
   *
   * @param id - The ID of the comment to update.
   * @param body - The updated comment data.
   * @returns The updated comment.
   * @throws NotFoundException if the comment with the specified ID is not found.
   *
   * @author Jonathan Alvarado
   */
  async put(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateCommentDto
  ) {
    const comment = await this.commentsService.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return this.commentsService.update(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to delete a comment',
    summary: 'Delete a comment',
  })
  @CheckPolicies(new DeleteCommentPolicyHandler())
  @Delete(':id')
  /**
   * Deletes a comment by its ID.
   *
   * @param id - The ID of the comment to delete.
   * @returns A Promise that resolves to the deleted comment.
   * @throws NotFoundException if the comment with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async delete(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentsService.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return this.commentsService.delete(id);
  }
}
