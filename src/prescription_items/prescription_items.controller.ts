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
import { PrescriptionItemsService } from "./prescription_items.service";
import { CreatePrescriptionItemDto } from "./dto/create-prescription_item.dto";
import { UpdatePrescriptionItemDto } from "./dto/update-prescription_item.dto";

@ApiTags("PrescriptionItems")
@Controller("prescription-items")
export class PrescriptionItemsController {
  constructor(private s: PrescriptionItemsService) {}

  @ApiOperation({ summary: "Create prescription item" })
  @Post()
  create(@Body() dto: CreatePrescriptionItemDto) {
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
    @Body() dto: UpdatePrescriptionItemDto
  ) {
    return this.s.update(+id, dto);
  }
  @Delete(":id") remove(@Param("id") id: string) {
    return this.s.remove(+id);
  }
}
