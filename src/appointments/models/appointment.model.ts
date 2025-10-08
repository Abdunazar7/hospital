import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";

interface IAppointmentCreationAttr {
  patient_id: number;
  doctor_id: number;
  appointment_date: Date;
  status?: string;
  notes?: string;
}

@Table({ tableName: "appointments" })
export class Appointment extends Model<Appointment, IAppointmentCreationAttr> {
  @ApiProperty({ example: 1, description: "Appointment ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare patient_id: number;

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare doctor_id: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare appointment_date: Date;

  @ApiProperty({
    example: "PENDING",
    description: "Appointment status",
  })
  @Column({
    type: DataType.ENUM("PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"),
    defaultValue: "PENDING",
  })
  declare status: string;

  @Column({ type: DataType.TEXT })
  declare notes: string;

  @BelongsTo(() => Patient)
  declare patient: Patient;

  @BelongsTo(() => Doctor)
  declare doctor: Doctor;
}
