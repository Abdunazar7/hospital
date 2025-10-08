import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsOptional, Min } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  patient_id: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  appointment_id: number;

  @ApiProperty({ example: 120.75 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    example: "PENDING",
    enum: ["PENDING", "PAID", "FAILED"],
    required: false,
  })
  @IsOptional()
  @IsEnum(["PENDING", "PAID", "FAILED"])
  status?: "PENDING" | "PAID" | "FAILED";
}
