import { DataTypes, Includeable } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Comment } from 'src/modules/incidents/models/comment.model';
import { Incident } from 'src/modules/incidents/models/incident.model';
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
    foreignKey: 'assigned_to',
    as: 'incidentsAssigned',
  })
  incidentsAssigned: Incident[];

  @HasMany(() => Incident, {
    foreignKey: 'owner_id',
    as: 'incidentsOwned',
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

  static getIncludes(includes: string[] = []): Includeable | Includeable[] {
    return includes.map((include) => this.associations[include]);
  }
}
