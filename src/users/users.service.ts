import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly user: typeof User) {}

  async findOne(query: FindOptions<User>) {
    return await this.user.findOne(query);
  }
}
