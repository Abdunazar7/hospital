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
import { User } from "../../users/models/user.model";
import { Appointment } from "../../appointments/models/appointment.model";
import { Payment } from "../../payments/models/payment.model";
import { MedicalRecord } from "../../medical_records/models/medical_record.model";

interface IPatientCreationAttr {
  user_id: number;
  birth_date?: Date;
  gender?: "MALE" | "FEMALE";
  address?: string;
}

@Table({ tableName: "patients" })
export class Patient extends Model<Patient, IPatientCreationAttr> {
  @ApiProperty({ example: 1, description: "Patient ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 5, description: "Linked User ID" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  declare user_id: number;

  @ApiProperty({ example: "1995-06-14", description: "Date of birth" })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare birth_date: Date;

  @ApiProperty({ example: "MALE", description: "Gender of patient" })
  @Column({
    type: DataType.ENUM("MALE", "FEMALE"),
    allowNull: true,
  })
  declare gender: "MALE" | "FEMALE";

  @ApiProperty({ example: "Tashkent, Uzbekistan", description: "Home address" })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare address: string;

  /** RELATIONS **/
  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Appointment)
  appointments: Appointment[];

  @HasMany(() => Payment)
  payments: Payment[];

}
