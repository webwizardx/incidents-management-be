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

  async create(body: Omit<CreateUserDto, 'number'>) {
    body.password = await hash(body.password);
    return await this.user.create(body);
  }

  async delete(id: number) {
    return await this.user.destroy({ where: { id } });
  }

  async find(query: QueryUserDto) {
    const { limit, order, orderBy, page, ...where } = query;
    const { count: totalCount, rows: data } = await this.user.findAndCountAll({
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

  async findOne(query: FindOptions<User>, scope: string = 'defaultScope') {
    return await this.user.scope(scope).findOne(query);
  }

  async patch(id: number, body: PatchUserDto) {
    return await this.user.update(body, { where: { id } });
  }

  async update(id: number, body: Omit<CreateUserDto, 'number'>) {
    return await this.user.update(body, { where: { id } });
  }
}
