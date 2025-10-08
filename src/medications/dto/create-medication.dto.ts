import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateMedicationDto {
  @ApiProperty({ example: "Ibuprofen" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Anti-inflammatory" })
  @IsString()
  description: string;

  @ApiProperty({ example: "capsule" })
  @IsString()
  unit: string;

  @ApiProperty({ example: 50, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;
}
