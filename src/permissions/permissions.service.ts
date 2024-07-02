import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { PaginatedResponseDto } from 'src/dto/paginated-response.dto';
import { User } from 'src/users/models/user.model';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PatchPermissionDto } from './dto/patch-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { Permission } from './models/permission.model';
import { Role } from './models/role.model';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission) private readonly permission: typeof Permission,
    @InjectModel(User) private readonly user: typeof User
  ) {}

  /**
   * Creates a new permission.
   * @param body - The data for creating the permission, excluding the 'number' field.
   * @returns A promise that resolves to the created permission.
   * @author Jonathan Alvarado
   */
  async create(body: Omit<CreatePermissionDto, 'number'>) {
    return await this.permission.create(body);
  }

  /**
   * Deletes a permission by its ID.
   * @param id - The ID of the permission to delete.
   * @returns A promise that resolves to the result of the deletion.
   * @author Jonathan Alvarado
   */
  async delete(id: number) {
    return await this.permission.destroy({ where: { id } });
  }

  /**
   * Finds permissions based on the provided query parameters.
   * @param query - The query parameters for finding permissions.
   * @returns A paginated response containing the found permissions.
   * @author Jonathan Alvarado
   */
  async find(query: QueryPermissionDto) {
    const { limit, order, orderBy, page, ...where } = query;
    const { count: totalCount, rows: data } =
      await this.permission.findAndCountAll({
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
   * Finds a single permission based on the provided query.
   * @param query - The query to filter the permission.
   * @returns A promise that resolves to the found permission.
   * @author Jonathan Alvarado
   */
  async findOne(query: FindOptions<Permission>) {
    return await this.permission.findOne(query);
  }

  /**
   * Retrieves the permissions of a user based on their user ID.
   * @param userId - The ID of the user.
   * @returns An array of user permissions, containing the action, ID, and subject of each permission.
   * @author Jonathan Alvarado
   */
  async findUserPermissions(userId: number) {
    const user = await this.user.findByPk(userId, {
      include: [
        {
          model: Role,
          include: [Permission],
        },
      ],
    });

    return user?.role?.permissions?.map((permission) => ({
      action: permission.action,
      id: permission.id,
      subject: permission.subject,
    }));
  }

  /**
   * Updates a permission by its ID.
   * @param id - The ID of the permission to update.
   * @param body - The data to update the permission with.
   * @returns A promise that resolves to the updated permission.
   * @author Jonathan Alvarado
   */
  async patch(id: number, body: PatchPermissionDto) {
    return await this.permission.update(body, { where: { id } });
  }

  /**
   * Updates a permission by its ID.
   * @param id - The ID of the permission to update.
   * @param body - The updated data for the permission, excluding the 'number' field.
   * @returns A promise that resolves to the updated permission.
   * @author Jonathan Alvarado
   */
  async update(id: number, body: Omit<CreatePermissionDto, 'number'>) {
    return await this.permission.update(body, { where: { id } });
  }
}
