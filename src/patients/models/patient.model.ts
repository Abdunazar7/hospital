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

interface IPatientCreationAttr {
  user_id: number;
  date_of_birth?: Date;
  gender?: string;
  blood_type?: string;
  emergency_contact?: string;
  address?: string;
}

@Table({ tableName: "patients" })
export class Patient extends Model<Patient, IPatientCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique patient ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 3, description: "Related user ID (foreign key)" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @ApiProperty({ example: "1990-05-15", description: "Date of birth" })
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  declare date_of_birth: Date | null;

  @ApiProperty({ example: "Male", description: "Gender" })
  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  declare gender: string | null;

  @ApiProperty({ example: "O+", description: "Blood type" })
  @Column({
    type: DataType.STRING(5),
    allowNull: true,
  })
  declare blood_type: string | null;

  @ApiProperty({
    example: "+998991234567",
    description: "Emergency contact number",
  })
  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  declare emergency_contact: string | null;

  @ApiProperty({ example: "Tashkent, Uzbekistan", description: "Home address" })
  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  declare address: string | null;

  @BelongsTo(() => User)
  user: User;
}
