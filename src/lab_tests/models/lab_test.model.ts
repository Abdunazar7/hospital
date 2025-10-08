import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Appointment } from "../../appointments/models/appointment.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { Patient } from "../../patients/models/patient.model";

interface ILabTestCreationAttr {
  appointment_id: number;
  doctor_id: number;
  patient_id: number;
  test_name: string;
  result?: string;
  status?: string;
}

@Table({ tableName: "lab_tests" })
export class LabTest extends Model<LabTest, ILabTestCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Appointment)
  @ApiProperty({ example: 10, description: "Appointment ID" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare appointment_id: number;

  @ForeignKey(() => Doctor)
  @ApiProperty({ example: 2, description: "Doctor ID" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare doctor_id: number;

  @ForeignKey(() => Patient)
  @ApiProperty({ example: 3, description: "Patient ID" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare patient_id: number;

  @ApiProperty({ example: "Blood Test", description: "Test name" })
  @Column({ type: DataType.STRING(100), allowNull: false })
  declare test_name: string;

  @ApiProperty({ example: "Normal", description: "Result of the test" })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare result: string | null;

  @ApiProperty({
    example: "PENDING",
    enum: ["PENDING", "COMPLETED"],
    description: "Test status",
  })
  @Column({
    type: DataType.ENUM("PENDING", "COMPLETED"),
    defaultValue: "PENDING",
  })
  declare status: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  declare created_at: Date;

  @BelongsTo(() => Appointment) appointment: Appointment;
  @BelongsTo(() => Doctor) doctor: Doctor;
  @BelongsTo(() => Patient) patient: Patient;
}
