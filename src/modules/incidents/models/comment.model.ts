import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/models/user.model';
import { Incident } from './incident.model';

@Table({
  paranoid: true,
  tableName: 'comments',
  underscored: true,
})
export class Comment extends Model {
  @Column({
    type: DataTypes.TEXT,
  })
  description: string;

  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  })
  id: number;

  @Column({
    allowNull: true,
    type: DataTypes.TEXT,
  })
  imageUrl?: string;

  @Column({
    type: DataTypes.BIGINT,
  })
  @ForeignKey(() => Incident)
  incidentId: number;

  @BelongsTo(() => Incident, 'incident_id')
  incident: Incident;

  @Column({
    type: DataTypes.BIGINT,
  })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User, 'user_id')
  user: User;
}
