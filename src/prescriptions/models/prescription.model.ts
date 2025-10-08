import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { MedicalRecord } from "../../medical_records/models/medical_record.model";
import { PrescriptionItem } from "../../prescription_items/models/prescription_item.model";

interface IPrescriptionCreationAttr {
  medical_record_id: number;
  notes: string;
}

@Table({ tableName: "prescriptions" })
export class Prescription extends Model<
  Prescription,
  IPrescriptionCreationAttr
> {
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => MedicalRecord)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare medical_record_id: number;

  @ApiProperty({ example: "Take twice daily" })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare notes: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  declare created_at: Date;

  @BelongsTo(() => MedicalRecord) medical_record: MedicalRecord;
  @HasMany(() => PrescriptionItem) items: PrescriptionItem[];
}
