import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/permissions/models/role.model';

@Table({
  paranoid: true,
  tableName: 'users',
  underscored: true,
})
export class User extends Model {
  @Column({
    type: DataTypes.TEXT,
  })
  email: string;

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
  firstName: string;

  @Column({
    type: DataTypes.TEXT,
  })
  lastName: string;

  @Column({
    type: DataTypes.TEXT,
  })
  password: string;

  @Column({
    type: DataTypes.BIGINT,
  })
  @ForeignKey(() => Role)
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;
}
