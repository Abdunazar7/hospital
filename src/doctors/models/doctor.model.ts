import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface IDoctorCreationAttr {
  user_id: number;
  specialization: string;
  experience_years?: number;
  consultation_fee?: number;
  clinic_address?: string;
}

@Table({ tableName: "doctors" })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique doctor ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 2, description: "Linked user ID" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
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
  declare experience_years: number | null;

  @ApiProperty({ example: 200, description: "Consultation fee in USD" })
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  declare consultation_fee: number | null;

  @ApiProperty({
    example: "Tashkent City Hospital, Block B",
    description: "Clinic address",
  })
  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  declare clinic_address: string | null;

  @BelongsTo(() => User)
  user: User;
}
