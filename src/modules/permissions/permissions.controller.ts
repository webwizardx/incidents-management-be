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
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/modules/users/users.service';
import { CheckPolicies } from './decorators/check-policies.decorator';
import { CheckUserPermissionDto } from './dto/check-user-permission.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PatchPermissionDto } from './dto/patch-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { QueryUserPermissionDto } from './dto/query-user-permission.dto';
import { Permission } from './models/permission.model';
import { Role as RoleModel } from './models/role.model';
import { PermissionsAbilityFactory } from './permissions-ability.factory/permissions-ability.factory';
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
  constructor(
    private permissionsAbilityFactory: PermissionsAbilityFactory,
    private readonly permissionsService: PermissionsService,
    private readonly usersService: UsersService
  ) {}

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
    description:
      'This endpoint is used to check if the current user has permission',
    summary: 'Check if the current user has permission',
  })
  @Get('/users/check-current')
  /**
   * Checks the current user's permission for a specific action and subject.
   *
   * @param req - The request object containing user information.
   * @param query - The query object containing the action and subject.
   * @returns An object with the action, subject, and whether the user has permission for the action and subject.
   * @throws NotFoundException if the user with the specified id is not found.
   * @author Jonathan Alvarado
   */
  async checkCurrentUserPermission(
    @Req() req: any,
    @Query() query: CheckUserPermissionDto
  ) {
    const id = req.user.id;
    const { action, subject } = query;
    const user = await this.usersService.findOne({
      where: { id },
      include: [
        {
          model: RoleModel,
          include: [Permission],
        },
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const ability = this.permissionsAbilityFactory.createForUser(user);

    return {
      action,
      hasPermission: ability.can(action, subject),
      subject,
    };
  }

  @ApiOperation({
    description: 'This endpoint is used to check if a user has permission',
    summary: 'Check if a user has permission',
  })
  @Get('/users/check/:id')
  /**
   * Checks the user's permission for a specific action and subject.
   *
   * @param id - The ID of the user.
   * @param query - The query parameters containing the action and subject.
   * @returns An object containing the action, whether the user has permission, and the subject.
   * @throws NotFoundException if the user with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async checkUserPermission(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: CheckUserPermissionDto
  ) {
    const { action, subject } = query;
    const user = await this.usersService.findOne({
      where: { id },
      include: [
        {
          model: RoleModel,
          include: [Permission],
        },
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const ability = this.permissionsAbilityFactory.createForUser(user);

    return {
      action,
      hasPermission: ability.can(action, subject),
      subject,
    };
  }

  @ApiOperation({
    description:
      'This endpoint is used to get a list of permissions for a user. We can pass the user id to get the permissions for that user. If no id is passed, the permissions for the current user will be returned.',
    summary:
      'Get a list of permissions for a user. If no id is passed, the permissions for the current user will be returned.',
  })
  @CheckPolicies(new ReadPermissionPolicyHandler())
  @Get('/users')
  /**
   * Retrieves the permissions for a user.
   *
   * @param req - The request object.
   * @param query - The query parameters.
   * @returns A Promise that resolves to the user's permissions.
   * @author Jonathan Alvarado
   */
  async findUserPermissions(
    @Req() req: any,
    @Query() query: QueryUserPermissionDto
  ) {
    const userId = query.id || req.user.id;

    return this.permissionsService.findUserPermissions(userId);
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
