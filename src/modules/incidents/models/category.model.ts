import { DataTypes } from 'sequelize';
import { Column, HasOne, Model, Table } from 'sequelize-typescript';
import { User } from 'src/modules/users/models/user.model';

@Table({
  tableName: 'categories',
  timestamps: false,
  underscored: true,
})
export class Category extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  })
  id: number;

  @Column({
    type: DataTypes.TEXT,
  })
  name: string;

  @HasOne(() => User, 'category_id')
  user: User;
}
