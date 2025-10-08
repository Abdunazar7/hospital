import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { DoctorsService } from "./doctors.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";

@ApiTags("Doctors")
@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @ApiOperation({ summary: "Create a new doctor" })
  @Post()
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorsService.create(dto);
  }

  @ApiOperation({ summary: "Get all doctors" })
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @ApiOperation({ summary: "Get doctor by ID" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.doctorsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update doctor information" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, dto);
  }

  @ApiOperation({ summary: "Delete a doctor" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.doctorsService.remove(+id);
  }
}
