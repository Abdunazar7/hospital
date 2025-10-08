import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateMedicalRecordDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  appointment_id: number;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsInt()
  lab_test_id?: number;

  @ApiProperty({ example: "Diagnosis text" })
  @IsString()
  diagnosis: string;

  @ApiProperty({ example: "Treatment text", required: false })
  @IsOptional()
  @IsString()
  treatment?: string;
}
