import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsDateString } from "class-validator";

export class CreatePatientDto {
  @ApiProperty({ example: 3 })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: "1990-05-15", required: false })
  @IsOptional()
  @IsDateString()
  date_of_birth?: Date;

  @ApiProperty({ example: "Male", required: false })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ example: "O+", required: false })
  @IsOptional()
  @IsString()
  blood_type?: string;

  @ApiProperty({ example: "+998991234567", required: false })
  @IsOptional()
  @IsString()
  emergency_contact?: string;

  @ApiProperty({ example: "Tashkent, Uzbekistan", required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
