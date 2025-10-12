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
  ForbiddenException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

import { PatientsService } from "./patient.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";

import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreatorGuard } from "../common/guards/creator.guard";
import { Roles, UserRole } from "../app.constants";

@ApiTags("Patients")
@ApiBearerAuth("JWT-auth")
@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiOperation({ summary: "Create a new patient (ADMIN only)" })
  @ApiResponse({
    status: 201,
    description: "Patient created successfully",
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Post()
  @HttpCode(201)
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @ApiOperation({ summary: "Get all patients (ADMIN, DOCTOR, STAFF)" })
  @ApiResponse({ status: 200, description: "List of all patients" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @ApiOperation({ summary: "Get patient by ID (ADMIN, DOCTOR, STAFF)" })
  @ApiResponse({ status: 200, description: "Patient details" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: number) {
    const patient = await this.patientsService.findOne(id);
    if (!patient)
      throw new ForbiddenException("Patient not found or access denied");
    return patient;
  }

  @ApiOperation({ summary: "Update patient data (ADMIN, DOCTOR)" })
  @ApiResponse({
    status: 200,
    description: "Patient updated successfully",
  })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Put(":id")
  update(@Param("id") id: number, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @ApiOperation({ summary: "Delete patient (Creator Admin only)" })
  @ApiResponse({
    status: 200,
    description: "Patient deleted successfully",
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @UseGuards(CreatorGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.patientsService.remove(id);
  }
}
