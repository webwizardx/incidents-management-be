import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { PaginatedResponseDto } from 'src/dto/paginated-response.dto';
import { CreateRoleHasPermissionDto } from './dto/create-role-has-permission.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { PatchRoleDto } from './dto/patch-role.dto';
import { QueryRoleHasPermissionDto } from './dto/query-role-has-permission.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { RoleHasPermission } from './models/role-has-permission.model';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private readonly role: typeof Role,
    @InjectModel(RoleHasPermission)
    private readonly roleHasPermission: typeof RoleHasPermission
  ) {}

  /**
   * Creates a new role.
   * @param body - The role data to be created.
   * @returns A promise that resolves to the created role.
   * @author Jonathan Alvarado
   */
  async create(body: Omit<CreateRoleDto, 'number'>) {
    return await this.role.create(body);
  }

  /**
   * Creates a new role with the specified permissions.
   *
   * @param body - The data for creating the role and its permissions.
   * @returns A Promise that resolves to the created role with permissions.
   * @author Jonathan Alvarado
   */
  async createRoleHasPermission(
    body: Omit<CreateRoleHasPermissionDto, 'number'>
  ) {
    return await this.roleHasPermission.create(body);
  }

  /**
   * Deletes a role by its ID.
   * @param id - The ID of the role to delete.
   * @returns A promise that resolves to the result of the deletion operation.
   * @author Jonathan Alvarado
   */
  async delete(id: number) {
    return await this.role.destroy({ where: { id } });
  }

  /**
   * Deletes a role's permission by ID.
   * @param id - The ID of the role's permission to delete.
   * @returns A promise that resolves to the result of the deletion operation.
   * @author Jonathan Alvarado
   */
  async deleteRoleHasPermission(id: number) {
    return await this.roleHasPermission.destroy({ where: { id } });
  }

  /**
   * Finds roles based on the provided query parameters.
   * @param query - The query parameters for finding roles.
   * @returns A paginated response containing the roles that match the query.
   * @author Jonathan Alvarado
   */
  async find(query: QueryRoleDto) {
    const { limit, order, orderBy, page, ...where } = query;
    const { count: totalCount, rows: data } = await this.role.findAndCountAll({
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
   * Finds a role based on the provided query options.
   * @param query - The query options to filter the role.
   * @returns A promise that resolves to the found role.
   * @author Jonathan Alvarado
   */
  async findOne(query: FindOptions<Role>) {
    return await this.role.findOne(query);
  }

  /**
   * Finds a role that has a specific permission based on the provided query parameters.
   * @param query - The query parameters for finding the role with permission.
   * @returns A paginated response containing the role with permission.
   * @author Jonathan Alvarado
   */
  async findRoleHasPermission(query: QueryRoleHasPermissionDto) {
    const { limit, order, orderBy, page, ...where } = query;
    const { count: totalCount, rows: data } =
      await this.roleHasPermission.findAndCountAll({
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
   * Finds a role that has a specific permission based on the provided query.
   * @param query - The query options to filter the role with permission.
   * @returns A promise that resolves to the found role with permission.
   * @author Jonathan Alvarado
   */
  async findOneRoleHasPermission(query: FindOptions<RoleHasPermission>) {
    return await this.roleHasPermission.findOne(query);
  }

  /**
   * Updates a role by applying the specified changes.
   * @param id - The ID of the role to update.
   * @param body - The changes to apply to the role.
   * @returns A promise that resolves to the updated role.
   * @author Jonathan Alvarado
   */
  async patch(id: number, body: PatchRoleDto) {
    return await this.role.update(body, { where: { id } });
  }

  /**
   * Updates a role with the specified ID.
   * @param id - The ID of the role to update.
   * @param body - The updated role data.
   * @returns A promise that resolves to the updated role.
   * @author Jonathan Alvarado
   */
  async update(id: number, body: Omit<CreateRoleDto, 'number'>) {
    return await this.role.update(body, { where: { id } });
  }
}
