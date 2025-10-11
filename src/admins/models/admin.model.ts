import { Table, Model, Column, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IAdminCreationAttr {
  full_name: string;
  email: string;
  password: string;
  is_creator?: boolean;
  role?: string;
}

@Table({ tableName: "admins" })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({ example: 1, description: "Admin ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "John Doe", description: "Full name of admin" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare full_name: string;

  @ApiProperty({ example: "admin@example.com", description: "Admin email" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @ApiProperty({ example: "hashed_password", description: "Admin password" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ApiProperty({
    example: "PATIENT",
    description: "User role (ADMIN, DOCTOR, PATIENT, STAFF, USER)",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: "ADMIN",
  })
  declare role: string;

  @ApiProperty({
    example: true,
    description: "Is this the main creator admin?",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_creator: boolean;

  @ApiProperty({ example: true, description: "Whether admin is active" })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  @ApiProperty({
    example: null,
    description: "Hashed refresh token",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare refresh_token: string | null;
}
