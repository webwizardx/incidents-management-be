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
import { CheckPolicies } from './decorators/check-policies.decorator';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PatchPermissionDto } from './dto/patch-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { PermissionsService } from './permissions.service';
import {
  CreatePermissionPolicyHandler,
  DeletePermissionPolicyHandler,
  ReadPermissionPolicyHandler,
  UpdatePermissionPolicyHandler,
} from './policies/permissions';

@ApiBearerAuth('BearerJWT')
@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiOperation({
    description: 'This endpoint is used to create a permission',
    summary: 'Create a permission',
  })
  @CheckPolicies(new CreatePermissionPolicyHandler())
  @Post()
  /**
   * Creates a new permission.
   *
   * @param body - The data for creating the permission.
   * @returns A Promise that resolves to the created permission.
   * @author Jonathan Alvarado
   */
  async create(@Body() body: CreatePermissionDto) {
    return this.permissionsService.create(body);
  }

  @ApiOperation({
    description: 'This endpoint is used to get a list of permissions',
    summary: 'Get a list of permissions',
  })
  @CheckPolicies(new ReadPermissionPolicyHandler())
  @Get()
  /**
   * Finds permissions based on the provided query.
   *
   * @param query - The query parameters for finding permissions.
   * @returns A Promise that resolves to the found permissions.
   * @author Jonathan Alvarado
   */
  async find(@Query() query: QueryPermissionDto) {
    return this.permissionsService.find(query);
  }

  @ApiOperation({
    description: 'This endpoint is used to get a permission',
    summary: 'Get a permission',
  })
  @CheckPolicies(new ReadPermissionPolicyHandler())
  @Get(':id')
  /**
   * Finds a permission by its ID.
   *
   * @param id - The ID of the permission to find.
   * @returns The found permission.
   * @throws `NotFoundException` if the permission with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const permission = await this.permissionsService.findOne({ where: { id } });

    if (!permission) {
      throw new NotFoundException(`Permission with id ${id} not found`);
    }

    return permission;
  }

  @ApiOperation({
    description: 'This endpoint is used to partially update a permission',
    summary: 'Partially update a permission',
  })
  @CheckPolicies(new UpdatePermissionPolicyHandler())
  @Patch(':id')
  /**
   * Updates a permission by applying the changes specified in the request body.
   * @param id - The ID of the permission to update.
   * @param body - The data containing the changes to apply.
   * @returns A Promise that resolves to the updated permission.
   * @throws NotFoundException if the permission with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PatchPermissionDto
  ) {
    const permission = await this.permissionsService.findOne({ where: { id } });

    if (!permission) {
      throw new NotFoundException(`Permission with id ${id} not found`);
    }

    return this.permissionsService.patch(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to update a permission',
    summary: 'Update a permission',
  })
  @CheckPolicies(new UpdatePermissionPolicyHandler())
  @Put(':id')
  /**
   * Updates a permission by its ID.
   *
   * @param id - The ID of the permission to update.
   * @param body - The updated permission data.
   * @returns The updated permission.
   * @throws NotFoundException if the permission with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async put(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreatePermissionDto
  ) {
    const permission = await this.permissionsService.findOne({ where: { id } });

    if (!permission) {
      throw new NotFoundException(`Permission with id ${id} not found`);
    }

    return this.permissionsService.update(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to delete a permission',
    summary: 'Delete a permission',
  })
  @CheckPolicies(new DeletePermissionPolicyHandler())
  @Delete(':id')
  /**
   * Deletes a permission by its ID.
   *
   * @param id - The ID of the permission to delete.
   * @returns A Promise that resolves to the deleted permission.
   * @throws NotFoundException if the permission with the specified ID is not found.
   *
   * @author Jonathan Alvarado
   */
  async delete(@Param('id', ParseIntPipe) id: number) {
    const permission = await this.permissionsService.findOne({ where: { id } });

    if (!permission) {
      throw new NotFoundException(`Permission with id ${id} not found`);
    }

    return this.permissionsService.delete(id);
  }
}
