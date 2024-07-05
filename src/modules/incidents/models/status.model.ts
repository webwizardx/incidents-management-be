import { DataTypes } from 'sequelize';
import { Column, HasOne, Model, Table } from 'sequelize-typescript';
import { User } from 'src/modules/users/models/user.model';

@Table({
  paranoid: true,
  tableName: 'status',
  underscored: true,
})
export class Status extends Model {
  @Column({
    allowNull: true,
    type: DataTypes.TEXT,
  })
  description?: string;

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

  @HasOne(() => User, 'status_id')
  user: User;
}
