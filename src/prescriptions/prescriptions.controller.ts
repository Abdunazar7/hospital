import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PrescriptionsService } from "./prescriptions.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";

@ApiTags("Prescriptions")
@Controller("prescriptions")
export class PrescriptionsController {
  constructor(private readonly service: PrescriptionsService) {}

  @ApiOperation({ summary: "Create a new prescription" })
  @Post()
  @HttpCode(201)
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.service.create(createPrescriptionDto);
  }

  @ApiOperation({ summary: "Get all prescriptions" })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: "Get prescription by ID" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.service.findOne(id);
  }

  @ApiOperation({ summary: "Update prescription" })
  @Put(":id")
  update(@Param("id") id: number, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.service.update(id, updatePrescriptionDto);
  }

  @ApiOperation({ summary: "Delete prescription" })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.service.remove(id);
  }
}
