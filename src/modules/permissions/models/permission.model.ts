import { DataTypes } from 'sequelize';
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { RoleHasPermission } from './role-has-permission.model';
import { Role } from './role.model';

@Table({
  tableName: 'permissions',
  timestamps: false,
  underscored: true,
})
export class Permission extends Model {
  @Column({
    type: DataTypes.TEXT,
  })
  action: string;

  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  })
  id: number;

  @BelongsToMany(
    () => Role,
    () => RoleHasPermission,
    'role_id',
    'permission_id'
  )
  roles: Role[];

  @Column({
    type: DataTypes.TEXT,
  })
  subject: string;
}
