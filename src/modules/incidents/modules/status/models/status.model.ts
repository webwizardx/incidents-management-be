import { DataTypes } from 'sequelize';
import { Column, HasOne, Model, Table } from 'sequelize-typescript';
import { Incident } from 'src/modules/incidents/models/incident.model';

@Table({
  tableName: 'status',
  timestamps: false,
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

  @HasOne(() => Incident, 'status_id')
  incident: Incident;
}
