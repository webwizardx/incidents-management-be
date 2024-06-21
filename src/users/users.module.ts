import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/permissions/models/role.model';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([Role, User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
