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
import { Appointment } from "../../appointments/models/appointment.model";
import { LabTest } from "../../lab_tests/models/lab_test.model";
import { Prescription } from "../../prescriptions/models/prescription.model";

interface IMedicalRecordCreationAttr {
  appointment_id: number;
  lab_test_id?: number;
  diagnosis: string;
  treatment?: string;
}

@Table({ tableName: "medical_records" })
export class MedicalRecord extends Model<
  MedicalRecord,
  IMedicalRecordCreationAttr
> {
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Appointment)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare appointment_id: number;

  @ForeignKey(() => LabTest)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare lab_test_id: number | null;

  @ApiProperty({ example: "Flu and fever" })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare diagnosis: string;

  @ApiProperty({ example: "Rest and hydration" })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare treatment: string | null;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  declare created_at: Date;

  @BelongsTo(() => Appointment) appointment: Appointment;
  @BelongsTo(() => LabTest) lab_test: LabTest;
  @HasMany(() => Prescription) prescriptions: Prescription[];
}
