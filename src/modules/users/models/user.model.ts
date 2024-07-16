import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Incident } from 'src/modules/incidents/models/incident.model';
import { Comment } from 'src/modules/incidents/modules/comments/models/comment.model';
import { Role } from 'src/modules/permissions/models/role.model';

@Table({
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  paranoid: true,
  scopes: {
    withPassword: {
      attributes: {
        include: ['password'],
      },
    },
  },
  tableName: 'users',
  underscored: true,
})
export class User extends Model {
  @Column({
    type: DataTypes.TEXT,
    unique: true,
  })
  email: string;

  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  })
  id: number;

  @Column({
    type: DataTypes.TEXT,
  })
  firstName: string;

  @HasMany(() => Incident, {
    as: 'incidentsAssigned',
    foreignKey: 'assigned_to',
  })
  incidentsAssigned: Incident[];

  @HasMany(() => Incident, {
    as: 'incidentsOwned',
    foreignKey: 'owner_id',
  })
  incidentsOwned: Incident[];

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

  @HasMany(() => Comment, 'user_id')
  comments: Comment[];
}
