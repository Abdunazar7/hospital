import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreatePatientDto {
  @ApiProperty({ example: 1, description: "Linked user ID" })
  @IsInt()
  user_id: number;

  @ApiProperty({
    example: "1990-03-15",
    description: "Birth date (ISO format)",
  })
  @IsOptional()
  @IsDateString()
  birth_date?: Date;

  @ApiProperty({ example: "MALE", description: "Gender" })
  @IsOptional()
  @IsEnum(["MALE", "FEMALE"])
  gender?: "MALE" | "FEMALE";

  @ApiProperty({
    example: "Samarkand, Uzbekistan",
    description: "Home address",
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;
}
