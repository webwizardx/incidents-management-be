import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { Permission } from './models/permission.model';
import { RoleHasPermission } from './models/role-has-permission.model';
import { Role } from './models/role.model';
import { PermissionsAbilityFactory } from './permissions-ability.factory/permissions-ability.factory';

@Module({
  imports: [
    SequelizeModule.forFeature([Permission, Role, RoleHasPermission, User]),
  ],
  exports: [PermissionsAbilityFactory],
  providers: [PermissionsAbilityFactory],
})
export class PermissionsModule {}
