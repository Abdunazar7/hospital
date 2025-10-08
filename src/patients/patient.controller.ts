import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PatientsService } from "./patient.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";

@ApiTags("Patients")
@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiOperation({ summary: "Create new patient" })
  @Post()
  create(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
  }

  @ApiOperation({ summary: "Get all patients" })
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @ApiOperation({ summary: "Get patient by ID" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update patient data" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdatePatientDto) {
    return this.patientsService.update(+id, dto);
  }

  @ApiOperation({ summary: "Delete patient" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }
}
