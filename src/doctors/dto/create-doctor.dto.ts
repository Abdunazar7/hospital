import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateDoctorDto {
  @ApiProperty({ example: 2, description: "User ID" })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: "Neurologist", description: "Doctor specialization" })
  @IsString()
  @MaxLength(100)
  specialization: string;

  @ApiProperty({ example: 5, description: "Years of experience" })
  @IsOptional()
  @IsInt()
  @Min(0)
  experience?: number;

  @ApiProperty({ example: "B-12", description: "Room number" })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  room_number?: string;
}
