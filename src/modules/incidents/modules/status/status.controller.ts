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
import { CreateStatusDto } from './dto/create-status.dto';
import { PatchStatusDto } from './dto/patch-status.dto';
import { QueryStatusDto } from './dto/query-status.dto';
import {
  CreateStatusPolicyHandler,
  DeleteStatusPolicyHandler,
  ReadStatusPolicyHandler,
  UpdateStatusPolicyHandler,
} from './policies';
import { StatusService } from './status.service';

@ApiBearerAuth(API_BEARER_AUTH)
@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({
    description: 'This endpoint is used to create a status',
    summary: 'Create a status',
  })
  @CheckPolicies(new CreateStatusPolicyHandler())
  @Post()
  /**
   * Creates a new status.
   * @param body - The data for creating the status.
   * @returns The created status.
   * @author Jonathan Alvarado
   */
  async create(@Body() body: CreateStatusDto) {
    return this.statusService.create(body);
  }

  @ApiOperation({
    description: 'This endpoint is used to get all statuses',
    summary: 'Get all statuses',
  })
  @CheckPolicies(new ReadStatusPolicyHandler())
  @Get()
  /**
   * Finds statuses based on the provided query.
   * @param query - The query parameters for filtering statuses.
   * @returns A promise that resolves to the found statuses.
   * @author Jonathan Alvarado
   */
  async find(@Query() query: QueryStatusDto) {
    return this.statusService.find(query);
  }

  @ApiOperation({
    description: 'This endpoint is used to get a status by id',
    summary: 'Get a status by id',
  })
  @CheckPolicies(new ReadStatusPolicyHandler())
  @Get(':id')
  /**
   * Finds a status by its ID.
   * @param id - The ID of the status to find.
   * @returns The found status.
   * @throws `NotFoundException` if the status with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const status = await this.statusService.findOne({ where: { id } });

    if (!status) {
      throw new NotFoundException(`Status with id ${id} not found`);
    }

    return status;
  }

  @ApiOperation({
    description: 'This endpoint is used to partially update a status',
    summary: 'Update a status',
  })
  @CheckPolicies(new UpdateStatusPolicyHandler())
  @Patch(':id')
  /**
   * Updates a status by applying partial updates specified in the request body.
   * @param id - The ID of the status to update.
   * @param body - The partial updates to apply to the status.
   * @returns The updated status.
   * @throws NotFoundException if the status with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PatchStatusDto
  ) {
    const status = await this.statusService.findOne({ where: { id } });

    if (!status) {
      throw new NotFoundException(`Status with id ${id} not found`);
    }

    return this.statusService.patch(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to update a status',
    summary: 'Update a status',
  })
  @CheckPolicies(new UpdateStatusPolicyHandler())
  @Put(':id')
  /**
   * Updates a status by its ID.
   *
   * @param id - The ID of the status to update.
   * @param body - The updated status data.
   * @returns The updated status.
   * @throws NotFoundException if the status with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async put(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateStatusDto
  ) {
    const status = await this.statusService.findOne({ where: { id } });

    if (!status) {
      throw new NotFoundException(`Status with id ${id} not found`);
    }

    return this.statusService.update(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to delete a status',
    summary: 'Delete a status',
  })
  @CheckPolicies(new DeleteStatusPolicyHandler())
  @Delete(':id')
  /**
   * Deletes a status by its ID.
   *
   * @param id - The ID of the status to delete.
   * @returns A Promise that resolves to the deleted status.
   * @throws NotFoundException if the status with the given ID is not found.
   * @author Jonathan Alvarado
   */
  async delete(@Param('id', ParseIntPipe) id: number) {
    const status = await this.statusService.findOne({ where: { id } });

    if (!status) {
      throw new NotFoundException(`Status with id ${id} not found`);
    }

    return this.statusService.delete(id);
  }
}
