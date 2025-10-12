import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
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

import { DoctorsService } from "./doctors.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";

import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";

import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreatorGuard } from "../common/guards/creator.guard";

@ApiTags("Doctors")
@ApiBearerAuth("JWT-auth")
@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @ApiOperation({ summary: "Create a new doctor (ADMIN only)" })
  @ApiResponse({ status: 201, description: "Doctor successfully created" })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Post()
  @HttpCode(201)
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @ApiOperation({ summary: "Get all doctors (ADMIN, STAFF)" })
  @ApiResponse({ status: 200, description: "List of all doctors" })
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @ApiOperation({ summary: "Get doctor by ID (ADMIN, DOCTOR, STAFF)" })
  @ApiResponse({ status: 200, description: "Doctor found" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: number) {
    const doctor = await this.doctorsService.findOne(id);
    if (!doctor)
      throw new ForbiddenException("Doctor not found or access denied");
    return doctor;
  }

  @ApiOperation({ summary: "Update doctor (ADMIN or CREATOR)" })
  @ApiResponse({ status: 200, description: "Doctor updated successfully" })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @UseGuards(CreatorGuard)
  @Put(":id")
  update(@Param("id") id: number, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @ApiOperation({ summary: "Delete doctor (Creator Admin only)" })
  @ApiResponse({ status: 200, description: "Doctor deleted successfully" })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @UseGuards(CreatorGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.doctorsService.remove(id);
  }
}
