import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/models/user.model';
import { Category } from '../modules/categories/models/category.model';
import { Comment } from '../modules/comments/models/comment.model';
import { Status } from '../modules/status/models/status.model';

@Table({
  paranoid: true,
  tableName: 'incidents',
  underscored: true,
})
export class Incident extends Model {
  @Column({
    allowNull: true,
    type: DataTypes.BIGINT,
  })
  @ForeignKey(() => User)
  assignedTo?: number;

  @BelongsTo(() => User, {
    as: 'assignee',
    foreignKey: 'assigned_to',
  })
  assignee?: User;

  @Column({
    type: DataTypes.BIGINT,
  })
  @ForeignKey(() => Category)
  categoryId: number;

  @BelongsTo(() => Category, 'category_id')
  category: Category;

  @Column({
    allowNull: true,
    type: DataTypes.DATE,
  })
  closedAt?: string;

  @HasMany(() => Comment, 'incident_id')
  comments?: Comment[];

  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  })
  id: number;

  @Column({
    type: DataTypes.BIGINT,
  })
  @ForeignKey(() => User)
  ownerId: number;

  @BelongsTo(() => User, {
    as: 'owner',
    foreignKey: 'owner_id',
  })
  owner: User;

  @Column({
    type: DataTypes.BIGINT,
  })
  @ForeignKey(() => Status)
  statusId: number;

  @BelongsTo(() => Status, 'status_id')
  status: Status;

  @Column({
    type: DataTypes.TEXT,
  })
  title: string;
}
