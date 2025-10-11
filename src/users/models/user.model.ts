import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Doctor } from "../../doctors/models/doctor.model";
import { Patient } from "../../patients/models/patient.model";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique user ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "John Doe", description: "Full name of the user" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare full_name: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "User email address",
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @ApiProperty({
    example: "+1234567890",
    description: "User phone number",
    required: false,
  })
  @Column({
    type: DataType.STRING(20),
    allowNull: true,
    unique: true,
  })
  declare phone: string | null;

  @ApiProperty({ example: "StrongPassword123", description: "User password" })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare password: string;

  @ApiProperty({
    example: "PATIENT",
    description: "User role (ADMIN, DOCTOR, PATIENT, STAFF, USER)",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: "USER",
  })
  declare role: string;

  @ApiProperty({ example: false, description: "User active status" })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @ApiProperty({ example: null, description: "Refresh token (if logged in)" })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare refresh_token: string | null;

  @ApiProperty({
    example: "a1b2c3d4-uuid-link",
    description: "Activation link for email verification",
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

  @ApiProperty({
    example: "2025-10-08T10:00:00Z",
    description: "Record creation date",
  })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare created_at: Date;

  @ApiProperty({
    example: "2025-10-08T10:00:00Z",
    description: "Record update date",
  })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updated_at: Date;

  @HasMany(() => Doctor)
  doctor: Doctor[];

  @HasMany(() => Patient)
  patient: Patient[];
}
