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

import { LabTestsService } from "./lab_tests.service";
import { CreateLabTestDto } from "./dto/create-lab_test.dto";
import { UpdateLabTestDto } from "./dto/update-lab_test.dto";

import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreatorGuard } from "../common/guards/creator.guard";
import { Roles, UserRole } from "../app.constants";

@ApiTags("Lab Tests")
@ApiBearerAuth("JWT-auth")
@Controller("lab-tests")
export class LabTestsController {
  constructor(private readonly labTestsService: LabTestsService) {}

  @ApiOperation({ summary: "Create a new lab test (DOCTOR, ADMIN only)" })
  @ApiResponse({ status: 201, description: "Lab test successfully created" })
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Post()
  @HttpCode(201)
  create(@Body() createLabTestDto: CreateLabTestDto) {
    return this.labTestsService.create(createLabTestDto);
  }

  @ApiOperation({ summary: "Get all lab tests (ADMIN, DOCTOR, STAFF)" })
  @ApiResponse({ status: 200, description: "List of all lab tests" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get()
  findAll() {
    return this.labTestsService.findAll();
  }

  @ApiOperation({ summary: "Get lab test by ID (ADMIN, DOCTOR, PATIENT)" })
  @ApiResponse({ status: 200, description: "Lab test found" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: number) {
    const lab = await this.labTestsService.findOne(id);
    if (!lab)
      throw new ForbiddenException("Lab test not found or access denied");
    return lab;
  }

  @ApiOperation({ summary: "Update a lab test (DOCTOR or ADMIN)" })
  @ApiResponse({ status: 200, description: "Lab test updated successfully" })
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Put(":id")
  update(@Param("id") id: number, @Body() updateLabTestDto: UpdateLabTestDto) {
    return this.labTestsService.update(id, updateLabTestDto);
  }

  @ApiOperation({ summary: "Delete a lab test (Creator Admin only)" })
  @ApiResponse({ status: 200, description: "Lab test deleted successfully" })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @UseGuards(CreatorGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.labTestsService.remove(id);
  }
}
