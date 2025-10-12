import {
  Controller,
  Get,
  Post,
  Body,
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

import { PrescriptionsService } from "./prescriptions.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";

import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";

import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { CreatorGuard } from "../common/guards/creator.guard";

@ApiTags("Prescriptions")
@ApiBearerAuth("JWT-auth")
@Controller("prescriptions")
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  // --- 🧾 CREATE PRESCRIPTION (DOCTOR only)
  @ApiOperation({ summary: "Create a new prescription (DOCTOR only)" })
  @ApiResponse({
    status: 201,
    description: "Prescription created successfully",
  })
  @Roles(UserRole.DOCTOR)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Post()
  @HttpCode(201)
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  // --- 📋 GET ALL (ADMIN, DOCTOR)
  @ApiOperation({ summary: "Get all prescriptions (ADMIN, DOCTOR)" })
  @ApiResponse({ status: 200, description: "List of prescriptions" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get()
  findAll() {
    return this.prescriptionsService.findAll();
  }

  // --- 🔍 GET BY ID (ADMIN, DOCTOR, PATIENT)
  @ApiOperation({
    summary: "Get prescription by ID (Admin/Doctor/Patient)",
  })
  @ApiResponse({ status: 200, description: "Prescription found" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @UseGuards(SelfGuard)
  @Get(":id")
  async findOne(@Param("id") id: number) {
    const prescription = await this.prescriptionsService.findOne(id);
    if (!prescription)
      throw new ForbiddenException("Prescription not found or access denied");
    return prescription;
  }

  // --- ✏️ UPDATE (DOCTOR, ADMIN)
  @ApiOperation({ summary: "Update prescription (DOCTOR, ADMIN)" })
  @ApiResponse({
    status: 200,
    description: "Prescription updated successfully",
  })
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Put(":id")
  update(@Param("id") id: number, @Body() updateDto: UpdatePrescriptionDto) {
    return this.prescriptionsService.update(id, updateDto);
  }

  // --- ❌ DELETE (ADMIN yoki CREATOR)
  @ApiOperation({
    summary: "Delete prescription (Creator or Admin only)",
  })
  @ApiResponse({
    status: 200,
    description: "Prescription deleted successfully",
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @UseGuards(CreatorGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.prescriptionsService.remove(id);
  }
}
