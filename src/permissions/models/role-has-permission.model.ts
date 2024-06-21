import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permission } from './permission.model';
import { Role } from './role.model';

@Table({
  tableName: 'roles_has_permissions',
  timestamps: false,
  underscored: true,
})
export class RoleHasPermission extends Model {
  @Column({
    autoIncrement: true,
    defaultValue: DataTypes.BIGINT,
    primaryKey: true,
    type: DataTypes.BIGINT,
  })
  id: number;

  @Column({
    type: DataTypes.BIGINT,
  })
  @ForeignKey(() => Permission)
  permissionId: number;

  @BelongsTo(() => Permission)
  permission: Permission;

  @Column({
    type: DataTypes.BIGINT,
  })
  @ForeignKey(() => Role)
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;
}
