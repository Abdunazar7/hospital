import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreatePrescriptionItemDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  prescription_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  medication_id: number;

  @ApiProperty({ example: "1 tablet" })
  @IsString()
  dosage: string;

  @ApiProperty({ example: "twice a day" })
  @IsString()
  frequency: string;

  @ApiProperty({ example: "7 days" })
  @IsString()
  duration: string;
}
