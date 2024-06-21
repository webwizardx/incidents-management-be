import { DataTypes } from 'sequelize';
import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { Permission } from './permission.model';
import { RoleHasPermission } from './role-has-permission.model';

@Table({
  tableName: 'roles',
  timestamps: false,
  underscored: true,
})
export class Role extends Model {
  @Column({
    autoIncrement: true,
    defaultValue: DataTypes.BIGINT,
    primaryKey: true,
    type: DataTypes.BIGINT,
  })
  id: number;

  @Column({
    type: DataTypes.TEXT,
  })
  name: string;

  @BelongsToMany(() => Permission, () => RoleHasPermission)
  permissions: Permission[];

  @HasMany(() => User)
  users: User[];
}
