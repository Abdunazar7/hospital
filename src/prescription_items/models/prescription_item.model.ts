import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Prescription } from "../../prescriptions/models/prescription.model";
import { Medication } from "../../medications/models/medication.model";

interface IPrescriptionItemCreationAttr {
  prescription_id: number;
  medication_id: number;
  dosage: string;
  frequency: string;
  duration: string;
}

@Table({ tableName: "prescription_items" })
export class PrescriptionItem extends Model<
  PrescriptionItem,
  IPrescriptionItemCreationAttr
> {
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Prescription)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare prescription_id: number;

  @ForeignKey(() => Medication)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare medication_id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare dosage: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare frequency: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare duration: string;

  @BelongsTo(() => Prescription) prescription: Prescription;
  @BelongsTo(() => Medication) medication: Medication;
}
