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
import { MedicalRecord } from "../../medical_records/models/medical_record.model";

interface IDoctorCreationAttr {
  user_id: number;
  specialization: string;
  experience?: number;
  room_number?: string;
}

@Table({ tableName: "doctors" })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
  @ApiProperty({ example: 1, description: "Doctor ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 3, description: "User ID linked to doctor" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  declare user_id: number;

  @ApiProperty({
    example: "Cardiologist",
    description: "Doctor specialization",
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare specialization: string;

  @ApiProperty({ example: 10, description: "Years of experience" })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare experience: number;

  @ApiProperty({ example: "A-203", description: "Doctor room number" })
  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  declare room_number: string;

  /** RELATIONS **/
  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Appointment)
  appointments: Appointment[];

}
