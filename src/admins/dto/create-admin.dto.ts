import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsBoolean,
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: "Admin One", description: "Full name" })
  @IsString()
  full_name: string;

  @ApiProperty({ example: "admin@example.com", description: "Admin email" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "StrongP@ssw0rd", description: "Password" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: false,
    description: "Whether this admin is the creator (optional)",
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({
    example: false,
    description: "Whether this admin is the creator (optional)",
  })
  @IsOptional()
  @IsBoolean()
  is_creator?: boolean;
}
