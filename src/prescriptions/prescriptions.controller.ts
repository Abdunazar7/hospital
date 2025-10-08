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
import { PrescriptionsService } from "./prescriptions.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";

@ApiTags("Prescriptions")
@Controller("prescriptions")
export class PrescriptionsController {
  constructor(private s: PrescriptionsService) {}

  @ApiOperation({ summary: "Create prescription" })
  @Post()
  create(@Body() dto: CreatePrescriptionDto) {
    return this.s.create(dto);
  }

  @Get() findAll() {
    return this.s.findAll();
  }
  @Get(":id") findOne(@Param("id") id: string) {
    return this.s.findOne(+id);
  }
  @Patch(":id") update(
    @Param("id") id: string,
    @Body() dto: UpdatePrescriptionDto
  ) {
    return this.s.update(+id, dto);
  }
  @Delete(":id") remove(@Param("id") id: string) {
    return this.s.remove(+id);
  }
}
