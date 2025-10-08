import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class CreateLabTestDto {
  @ApiProperty({ example: 10 })
  @IsInt()
  appointment_id: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  doctor_id: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  patient_id: number;

  @ApiProperty({ example: "Blood Test" })
  @IsString()
  test_name: string;

  @ApiProperty({ example: "Normal", required: false })
  @IsOptional()
  @IsString()
  result?: string;

  @ApiProperty({
    example: "PENDING",
    enum: ["PENDING", "COMPLETED"],
    required: false,
  })
  @IsOptional()
  @IsEnum(["PENDING", "COMPLETED"])
  status?: string;
}
