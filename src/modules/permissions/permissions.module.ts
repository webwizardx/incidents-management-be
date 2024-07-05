import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/models/user.model';
import { UsersModule } from 'src/modules/users/users.module';
import { Permission } from './models/permission.model';
import { RoleHasPermission } from './models/role-has-permission.model';
import { Role } from './models/role.model';
import { PermissionsAbilityFactory } from './permissions-ability.factory/permissions-ability.factory';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Permission, Role, RoleHasPermission, User]),
    UsersModule,
  ],
  exports: [PermissionsAbilityFactory],
  providers: [PermissionsAbilityFactory, PermissionsService, RolesService],
  controllers: [PermissionsController, RolesController],
})
export class PermissionsModule {}
