import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginAdminDto {
  @ApiProperty({ example: "admin@example.com", description: "Admin email" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "StrongP@ssw0rd", description: "Password" })
  @IsString()
  @MinLength(6)
  password: string;
}
