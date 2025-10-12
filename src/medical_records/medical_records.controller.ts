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

import { MedicalRecordsService } from "./medical_records.service";
import { CreateMedicalRecordDto } from "./dto/create-medical_record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical_record.dto";

import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreatorGuard } from "../common/guards/creator.guard";
import { Roles, UserRole } from "../app.constants";

@ApiTags("Medical Records")
@ApiBearerAuth("JWT-auth")
@Controller("medical-records")
export class MedicalRecordsController {
  constructor(private readonly service: MedicalRecordsService) {}

  @ApiOperation({ summary: "Create a new medical record (DOCTOR, ADMIN only)" })
  @ApiResponse({
    status: 201,
    description: "Medical record successfully created",
  })
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Post()
  @HttpCode(201)
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.service.create(createMedicalRecordDto);
  }

  @ApiOperation({
    summary: "Get all medical records (ADMIN, DOCTOR, STAFF only)",
  })
  @ApiResponse({
    status: 200,
    description: "List of all medical records",
  })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({
    summary: "Get a medical record by ID (ADMIN, DOCTOR, PATIENT)",
  })
  @ApiResponse({
    status: 200,
    description: "Medical record found",
  })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: number) {
    const record = await this.service.findOne(id);
    if (!record)
      throw new ForbiddenException("Medical record not found or access denied");
    return record;
  }

  @ApiOperation({ summary: "Update medical record (DOCTOR, ADMIN only)" })
  @ApiResponse({
    status: 200,
    description: "Medical record updated successfully",
  })
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
  ) {
    return this.service.update(id, updateMedicalRecordDto);
  }

  @ApiOperation({
    summary: "Delete medical record (Creator Admin only)",
  })
  @ApiResponse({
    status: 200,
    description: "Medical record deleted successfully",
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @UseGuards(CreatorGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.service.remove(id);
  }
}
