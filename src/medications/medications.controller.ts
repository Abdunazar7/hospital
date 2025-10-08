import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { MedicationsService } from "./medications.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";

@ApiTags("Medications")
@Controller("medications")
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @ApiOperation({ summary: "Create a new medication" })
  @Post()
  create(@Body() dto: CreateMedicationDto) {
    return this.medicationsService.create(dto);
  }

  @ApiOperation({ summary: "Get all medications" })
  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @ApiOperation({ summary: "Get medication by ID" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.medicationsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update a medication" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateMedicationDto) {
    return this.medicationsService.update(+id, dto);
  }

  @ApiOperation({ summary: "Delete a medication" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.medicationsService.remove(+id);
  }
}
