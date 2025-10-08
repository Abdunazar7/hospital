import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  full_name: string;

  @ApiProperty({ example: "john@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "+1234567890", required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: "StrongPassword123" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "StrongPassword123" })
  @IsString()
  @MinLength(6)
  confirm_password: string;

  @ApiProperty({
    example: "PATIENT",
    enum: ["ADMIN", "DOCTOR", "PATIENT", "STAFF"],
    required: false,
  })
  @IsOptional()
  @IsEnum(["ADMIN", "DOCTOR", "PATIENT", "STAFF"])
  role?: "ADMIN" | "DOCTOR" | "PATIENT" | "STAFF";
}
