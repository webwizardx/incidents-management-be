import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ paranoid: true, tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataTypes.TEXT,
  })
  email: string;

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
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  })
  userId: string;
}
