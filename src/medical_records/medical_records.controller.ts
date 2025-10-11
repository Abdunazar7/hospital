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
import { MedicalRecordsService } from "./medical_records.service";
import { CreateMedicalRecordDto } from "./dto/create-medical_record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical_record.dto";
import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";

@ApiTags("Medical Records")
@Controller("medical-records")
export class MedicalRecordsController {
  constructor(private readonly service: MedicalRecordsService) {}

  @ApiOperation({ summary: "Create medical record" })
  @Post()
  @HttpCode(201)
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.service.create(createMedicalRecordDto);
  }

  @ApiOperation({ summary: "Get all medical records" })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: "Get a medical record by ID" })
  @ApiResponse({ status: 200, description: "Medical record details" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.service.findOne(id);
  }

  @ApiOperation({ summary: "Update medical record" })
  @ApiResponse({
    status: 200,
    description: "Medical record updated successfully",
  })
  @Put(":id")
  update(@Param("id") id: number, @Body() updateMedicalRecordDto: UpdateMedicalRecordDto) {
    return this.service.update(id, updateMedicalRecordDto);
  }

  @ApiOperation({ summary: "Delete medical record" })
  @ApiResponse({
    status: 200,
    description: "Medical record deleted successfully",
  })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.service.remove(id);
  }
}
