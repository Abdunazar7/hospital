import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreatePrescriptionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  medical_record_id: number;

  @ApiProperty({ example: "Prescription notes" })
  @IsString()
  notes: string;
}
