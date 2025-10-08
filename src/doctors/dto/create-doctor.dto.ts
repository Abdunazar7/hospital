import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Min, IsNumber } from "class-validator";

export class CreateDoctorDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: "Cardiologist" })
  @IsString()
  specialization: string;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  experience_years?: number;

  @ApiProperty({ example: 200, required: false })
  @IsOptional()
  @IsNumber()
  consultation_fee?: number;

  @ApiProperty({ example: "Tashkent City Hospital", required: false })
  @IsOptional()
  @IsString()
  clinic_address?: string;
}
