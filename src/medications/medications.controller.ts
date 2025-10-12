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
  ForbiddenException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

import { MedicationsService } from "./medications.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";

import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreatorGuard } from "../common/guards/creator.guard";
import { Roles, UserRole } from "../app.constants";

@ApiTags("Medications")
@ApiBearerAuth("JWT-auth")
@Controller("medications")
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @ApiOperation({ summary: "Create a new medication (ADMIN, DOCTOR only)" })
  @ApiResponse({
    status: 201,
    description: "Medication created successfully",
  })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Post()
  @HttpCode(201)
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @ApiOperation({
    summary: "Get all medications (ADMIN, DOCTOR, STAFF, PATIENT)",
  })
  @ApiResponse({
    status: 200,
    description: "List of all medications",
  })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @ApiOperation({
    summary: "Get medication by ID (ADMIN, DOCTOR, STAFF, PATIENT)",
  })
  @ApiResponse({
    status: 200,
    description: "Medication found",
  })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: number) {
    const medication = await this.medicationsService.findOne(id);
    if (!medication)
      throw new ForbiddenException("Medication not found or access denied");
    return medication;
  }

  @ApiOperation({ summary: "Update medication (DOCTOR, ADMIN only)" })
  @ApiResponse({
    status: 200,
    description: "Medication updated successfully",
  })
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updateMedicationDto: UpdateMedicationDto
  ) {
    return this.medicationsService.update(id, updateMedicationDto);
  }

  @ApiOperation({ summary: "Delete medication (Creator Admin only)" })
  @ApiResponse({
    status: 200,
    description: "Medication deleted successfully",
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @UseGuards(CreatorGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.medicationsService.remove(id);
  }
}
