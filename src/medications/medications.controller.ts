import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MedicationsService } from "./medications.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";

@ApiTags("Medications")
@Controller("medications")
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @ApiOperation({ summary: "Create a new medication" })
  @Post()
  @HttpCode(201)
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @ApiOperation({ summary: "Get all medications" })
  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @ApiOperation({ summary: "Get medication by ID" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.medicationsService.findOne(id);
  }

  @ApiOperation({ summary: "Update medication" })
  @Put(":id")
  update(@Param("id") id: number, @Body() updateMedicationDto: UpdateMedicationDto) {
    return this.medicationsService.update(id, updateMedicationDto);
  }

  @ApiOperation({ summary: "Delete medication" })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.medicationsService.remove(id);
  }
}
