import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { PaginatedResponseDto } from 'src/dto/paginated-response.dto';
import { hash } from 'src/helpers/hash';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly user: typeof User) {}

  /**
   * Creates a new user.
   * @param body - The user data to be created.
   * @returns The created user.
   * @author Jonathan Alvarado
   */
  async create(body: Omit<CreateUserDto, 'number'>) {
    body.password = await hash(body.password);
    return await this.user.create(body);
  }

  /**
   * Deletes a user by their ID.
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves to the deleted user.
   * @author Jonathan Alvarado
   */
  async delete(id: number) {
    return await this.user.destroy({ where: { id } });
  }

  /**
   * Finds users based on the provided query parameters.
   * @param query - The query parameters for filtering and pagination.
   * @returns A paginated response containing the matching users.
   * @author Jonathan Alvarado
   */
  async find(query: QueryUserDto) {
    const { include, limit, order, orderBy, page, ...where } = query;
    const { count: totalCount, rows: data } = await this.user.findAndCountAll({
      include: this.user.getIncludes(include),
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
   * Finds a user based on the provided query and scope.
   * @param query - The query to find the user.
   * @param scope - The scope to apply when finding the user. Defaults to 'defaultScope'.
   * @returns A promise that resolves to the found user.
   * @author Jonathan Alvarado
   */
  async findOne(query: FindOptions<User>, scope: string = 'defaultScope') {
    return await this.user.scope(scope).findOne(query);
  }

  /**
   * Updates a user with the specified ID.
   * @param id - The ID of the user to update.
   * @param body - The data to update the user with.
   * @returns A promise that resolves to the updated user.
   * @author Jonathan Alvarado
   */
  async patch(id: number, body: PatchUserDto) {
    return await this.user.update(body, { where: { id } });
  }

  /**
   * Updates a user by their ID.
   * @param id - The ID of the user to update.
   * @param body - The updated user data.
   * @returns A promise that resolves to the updated user.
   * @author Jonathan Alvarado
   */
  async update(id: number, body: Omit<CreateUserDto, 'number'>) {
    return await this.user.update(body, { where: { id } });
  }
}
