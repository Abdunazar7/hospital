import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { PrescriptionItem } from "../../prescription_items/models/prescription_item.model";

interface IMedicationCreationAttr {
  name: string;
  description: string;
  unit: string;
  stock?: number;
}

@Table({ tableName: "medications" })
export class Medication extends Model<Medication, IMedicationCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: "Paracetamol", description: "Medication name" })
  @Column({ type: DataType.STRING(100), allowNull: false })
  declare name: string;

  @ApiProperty({
    example: "Pain reliever",
    description: "Medication description",
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare description: string;

  @ApiProperty({ example: "tablet", description: "Medication unit" })
  @Column({ type: DataType.STRING(50), allowNull: false })
  declare unit: string;

  @ApiProperty({ example: 100, description: "Available stock count" })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare stock: number;

  @HasMany(() => PrescriptionItem)
  prescription_items: PrescriptionItem[];
}
