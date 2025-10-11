import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PatientsService } from "./patient.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";

@ApiTags("Patients")
@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiOperation({ summary: "Create new patient" })
  @Post()
  @HttpCode(201)
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @ApiOperation({ summary: "Get all patients" })
  @ApiResponse({ status: 200, description: "List of all patients" })
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @ApiOperation({ summary: "Get patient by ID" })
  @ApiResponse({ status: 200, description: "Patient details" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.patientsService.findOne(id);
  }

  @ApiOperation({ summary: "Update patient data" })
  @ApiResponse({ status: 200, description: "Patient updated successfully" })
  @Put(":id")
  update(@Param("id") id: number, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @ApiOperation({ summary: "Delete patient" })
  @ApiResponse({ status: 200, description: "Patient deleted successfully" })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.patientsService.remove(id);
  }
}
