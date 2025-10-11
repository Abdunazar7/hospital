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
import { LabTestsService } from "./lab_tests.service";
import { CreateLabTestDto } from "./dto/create-lab_test.dto";
import { UpdateLabTestDto } from "./dto/update-lab_test.dto";
import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";

@ApiTags("Lab Tests")
@Controller("lab-tests")
export class LabTestsController {
  constructor(private readonly labTestsService: LabTestsService) {}

  @ApiOperation({ summary: "Create a new lab test" })
  @Post()
  @HttpCode(201)
  create(@Body() createLabTestDto: CreateLabTestDto) {
    return this.labTestsService.create(createLabTestDto);
  }

  @ApiOperation({ summary: "Get all lab tests" })
  @Get()
  findAll() {
    return this.labTestsService.findAll();
  }

  @ApiOperation({ summary: "Get one lab test by ID" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.labTestsService.findOne(id);
  }

  @ApiOperation({ summary: "Update a lab test" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @Put(":id")
  update(@Param("id") id: number, @Body() updateLabTestDto: UpdateLabTestDto) {
    return this.labTestsService.update(id, updateLabTestDto);
  }

  @ApiOperation({ summary: "Delete a lab test" })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.labTestsService.remove(id);
  }
}
