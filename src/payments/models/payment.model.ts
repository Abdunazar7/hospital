import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Patient } from "../../patients/models/patient.model";
import { Appointment } from "../../appointments/models/appointment.model";

interface IPaymentCreationAttr {
  patient_id: number;
  appointment_id: number;
  amount: number;
  status?: "PENDING" | "PAID" | "FAILED";
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Patient)
  @ApiProperty({ example: 3, description: "Patient ID" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare patient_id: number;

  @ForeignKey(() => Appointment)
  @ApiProperty({ example: 10, description: "Appointment ID" })
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  declare appointment_id: number;

  @ApiProperty({ example: 150.5, description: "Payment amount" })
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare amount: number;

  @ApiProperty({
    example: "PENDING",
    enum: ["PENDING", "PAID", "FAILED"],
    description: "Payment status",
  })
  @Column({
    type: DataType.ENUM("PENDING", "PAID", "FAILED"),
    defaultValue: "PENDING",
  })
  declare status: "PENDING" | "PAID" | "FAILED";

  @ApiProperty({ example: "2025-10-08T12:30:00Z", description: "Payment date" })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare payment_date: Date;

  @BelongsTo(() => Patient) patient: Patient;
  @BelongsTo(() => Appointment) appointment: Appointment;
}
