import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsIn,
} from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty({ example: 1, description: "Patient ID" })
  @IsInt()
  @IsNotEmpty()
  patient_id: number;

  @ApiProperty({ example: 2, description: "Doctor ID" })
  @IsInt()
  @IsNotEmpty()
  doctor_id: number;

  @ApiProperty({
    example: "2025-10-12T09:30:00Z",
    description: "Appointment date",
  })
  @IsDateString()
  appointment_date: Date;

  @ApiProperty({
    example: "PENDING",
    description: "Appointment status",
    enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
  })
  @IsOptional()
  @IsIn(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"])
  status?: string;

  @ApiProperty({
    example: "Follow-up for diabetes check",
    description: "Notes",
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
