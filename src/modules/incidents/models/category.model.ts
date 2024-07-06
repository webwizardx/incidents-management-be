import { DataTypes } from 'sequelize';
import { Column, HasOne, Model, Table } from 'sequelize-typescript';
import { Incident } from './incident.model';

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

  @HasOne(() => Incident, 'category_id')
  incident: Incident;
}
