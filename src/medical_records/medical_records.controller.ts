import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { MedicalRecordsService } from "./medical_records.service";
import { CreateMedicalRecordDto } from "./dto/create-medical_record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical_record.dto";

@ApiTags("MedicalRecords")
@Controller("medical-records")
export class MedicalRecordsController {
  constructor(private service: MedicalRecordsService) {}

  @ApiOperation({ summary: "Create medical record" })
  @Post()
  create(@Body() dto: CreateMedicalRecordDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: "Get all medical records" })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: "Get a medical record" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @ApiOperation({ summary: "Update medical record" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateMedicalRecordDto) {
    return this.service.update(+id, dto);
  }

  @ApiOperation({ summary: "Delete medical record" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
