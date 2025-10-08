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
import { LabTestsService } from "./lab_tests.service";
import { CreateLabTestDto } from "./dto/create-lab_test.dto";
import { UpdateLabTestDto } from "./dto/update-lab_test.dto";

@ApiTags("Lab Tests")
@Controller("lab-tests")
export class LabTestsController {
  constructor(private readonly labTestsService: LabTestsService) {}

  @ApiOperation({ summary: "Create a new lab test" })
  @Post()
  create(@Body() dto: CreateLabTestDto) {
    return this.labTestsService.create(dto);
  }

  @ApiOperation({ summary: "Get all lab tests" })
  @Get()
  findAll() {
    return this.labTestsService.findAll();
  }

  @ApiOperation({ summary: "Get one lab test by ID" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.labTestsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update a lab test" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateLabTestDto) {
    return this.labTestsService.update(+id, dto);
  }

  @ApiOperation({ summary: "Delete a lab test" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.labTestsService.remove(+id);
  }
}
