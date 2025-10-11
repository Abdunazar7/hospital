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
import { PrescriptionItemsService } from "./prescription_items.service";
import { CreatePrescriptionItemDto } from "./dto/create-prescription_item.dto";
import { UpdatePrescriptionItemDto } from "./dto/update-prescription_item.dto";
import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";

@ApiTags("Prescription Items")
@Controller("prescription-items")
export class PrescriptionItemsController {
  constructor(private readonly service: PrescriptionItemsService) {}

  @ApiOperation({ summary: "Create a new prescription item" })
  @ApiResponse({
    status: 201,
    description: "Prescription item created successfully",
  })
  @Post()
  @HttpCode(201)
  create(@Body() createPrescriptionItemDto: CreatePrescriptionItemDto) {
    return this.service.create(createPrescriptionItemDto);
  }

  @ApiOperation({ summary: "Get all prescription items" })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: "Get prescription item by ID" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.service.findOne(id);
  }

  @ApiOperation({ summary: "Update prescription item" })
  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updatePrescriptionItemDto: UpdatePrescriptionItemDto
  ) {
    return this.service.update(id, updatePrescriptionItemDto);
  }

  @ApiOperation({ summary: "Delete prescription item" })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.service.remove(id);
  }
}
