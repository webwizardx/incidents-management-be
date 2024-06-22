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
import { CreateRoleHasPermissionDto } from './dto/create-role-has-permission.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { PatchRoleDto } from './dto/patch-role.dto';
import { QueryRoleHasPermissionDto } from './dto/query-role-has-permission.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import {
  CreateRoleHasPermissionPolicyHandler,
  DeleteRoleHasPermissionPolicyHandler,
  ReadRoleHasPermissionPolicyHandler,
} from './policies/role-has-permission';
import {
  CreateRolePolicyHandler,
  DeleteRolePolicyHandler,
  ReadRolePolicyHandler,
  UpdateRolePolicyHandler,
} from './policies/roles';
import { RolesService } from './roles.service';

@ApiBearerAuth('BearerJWT')
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({
    description: 'This endpoint is used to create a role',
    summary: 'Create a role',
  })
  @CheckPolicies(new CreateRolePolicyHandler())
  @Post()
  /**
   * Creates a new role.
   * @param body - The data for creating the role.
   * @returns The created role.
   * @author Jonathan Alvarado
   */
  async create(@Body() body: CreateRoleDto) {
    return this.rolesService.create(body);
  }

  @ApiOperation({
    description: 'This endpoint is used to create a role has permission',
    summary: 'Create a role has permission',
  })
  @CheckPolicies(new CreateRoleHasPermissionPolicyHandler())
  @Post('role-has-permission')
  /**
   * Creates a role with the specified permissions.
   * @param body - The data required to create the role with permissions.
   * @returns A Promise that resolves to the created role with permissions.
   * @author Jonathan Alvarado
   */
  async createRoleHasPermission(@Body() body: CreateRoleHasPermissionDto) {
    return this.rolesService.createRoleHasPermission(body);
  }

  @ApiOperation({
    description: 'This endpoint is used to get a list of roles',
    summary: 'Get a list of roles',
  })
  @CheckPolicies(new ReadRolePolicyHandler())
  @Get()
  /**
   * Finds roles based on the provided query.
   * @param query - The query parameters for finding roles.
   * @returns A promise that resolves to the found roles.
   * @author Jonathan Alvarado
   */
  async find(@Query() query: QueryRoleDto) {
    return this.rolesService.find(query);
  }

  @ApiOperation({
    description: 'This endpoint is used to get a list of role has permission',
    summary: 'Get a list of role has permission',
  })
  @CheckPolicies(new ReadRoleHasPermissionPolicyHandler())
  @Get('role-has-permission')
  /**
   * Finds a role that has a specific permission.
   * @param query - The query parameters for finding the role with the permission.
   * @returns A Promise that resolves to the role with the permission.
   * @author Jonathan Alvarado
   */
  async findRoleHasPermission(@Query() query: QueryRoleHasPermissionDto) {
    return this.rolesService.findRoleHasPermission(query);
  }

  @ApiOperation({
    description: 'This endpoint is used to get a role',
    summary: 'Get a role',
  })
  @CheckPolicies(new ReadRolePolicyHandler())
  @Get(':id')
  /**
   * Finds a role by its ID.
   *
   * @param id - The ID of the role to find.
   * @returns The role with the specified ID.
   * @throws NotFoundException if no role is found with the specified ID.
   *
   * @author Jonathan Alvarado
   */
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const role = await this.rolesService.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return role;
  }

  @ApiOperation({
    description: 'This endpoint is used to partially update a role',
    summary: 'Partially update a role',
  })
  @CheckPolicies(new UpdateRolePolicyHandler())
  @Patch(':id')
  /**
   * Updates a role by applying the specified changes.
   *
   * @param id - The ID of the role to update.
   * @param body - The data containing the changes to apply to the role.
   * @returns A Promise that resolves to the updated role.
   * @throws `NotFoundException` if the role with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PatchRoleDto
  ) {
    const role = await this.rolesService.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return this.rolesService.patch(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to update a role',
    summary: 'Update a role',
  })
  @CheckPolicies(new UpdateRolePolicyHandler())
  @Put(':id')
  /**
   * Updates a role by its ID.
   *
   * @param id - The ID of the role to update.
   * @param body - The updated role data.
   * @returns The updated role.
   * @throws NotFoundException if the role with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async put(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateRoleDto
  ) {
    const role = await this.rolesService.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return this.rolesService.update(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to delete a role',
    summary: 'Delete a role',
  })
  @CheckPolicies(new DeleteRolePolicyHandler())
  @Delete(':id')
  /**
   * Deletes a role by its ID.
   *
   * @param id - The ID of the role to delete.
   * @returns A Promise that resolves to the deleted role.
   * @throws NotFoundException if the role with the specified ID is not found.
   *
   * @author Jonathan Alvarado
   */
  async delete(@Param('id', ParseIntPipe) id: number) {
    const role = await this.rolesService.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return this.rolesService.delete(id);
  }

  @ApiOperation({
    description: 'This endpoint is used to delete a role has permission',
    summary: 'Delete a role has permission',
  })
  @CheckPolicies(new DeleteRoleHasPermissionPolicyHandler())
  @Delete('role-has-permission/:id')
  /**
   * Deletes a role's permission by ID.
   * @param id - The ID of the role's permission to delete.
   * @returns A Promise that resolves to the deleted role's permission.
   * @throws NotFoundException if the role's permission with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async deleteRoleHasPermission(@Param('id', ParseIntPipe) id: number) {
    const roleHasPermission = await this.rolesService.findOneRoleHasPermission({
      where: { id },
    });

    if (!roleHasPermission) {
      throw new NotFoundException(`RoleHasPermission with id ${id} not found`);
    }

    return this.rolesService.deleteRoleHasPermission(id);
  }
}
