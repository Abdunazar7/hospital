import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  UseGuards,
  ForbiddenException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

import { PrescriptionItemsService } from "./prescription_items.service";
import { CreatePrescriptionItemDto } from "./dto/create-prescription_item.dto";
import { UpdatePrescriptionItemDto } from "./dto/update-prescription_item.dto";

import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";

import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { CreatorGuard } from "../common/guards/creator.guard";

@ApiTags("Prescription Items")
@ApiBearerAuth("JWT-auth")
@Controller("prescription-items")
export class PrescriptionItemsController {
  constructor(private readonly prescriptionItemsService: PrescriptionItemsService) {}

  @ApiOperation({ summary: "Create a new prescription item (DOCTOR only)" })
  @ApiResponse({
    status: 201,
    description: "Prescription item created successfully",
  })
  @Roles(UserRole.DOCTOR)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Post()
  @HttpCode(201)
  create(@Body() createPrescriptionItemDto: CreatePrescriptionItemDto) {
    return this.prescriptionItemsService.create(createPrescriptionItemDto);
  }

  @ApiOperation({ summary: "Get all prescription items (ADMIN, DOCTOR)" })
  @ApiResponse({
    status: 200,
    description: "List of all prescription items",
  })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get()
  findAll() {
    return this.prescriptionItemsService.findAll();
  }

  @ApiOperation({
    summary: "Get prescription item by ID (ADMIN, DOCTOR, PATIENT)",
  })
  @ApiResponse({
    status: 200,
    description: "Prescription item found successfully",
  })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @UseGuards(SelfGuard)
  @Get(":id")
  async findOne(@Param("id") id: number) {
    const item = await this.prescriptionItemsService.findOne(id);
    if (!item)
      throw new ForbiddenException(
        "Prescription item not found or access denied"
      );
    return item;
  }

  @ApiOperation({ summary: "Update prescription item (DOCTOR, ADMIN)" })
  @ApiResponse({
    status: 200,
    description: "Prescription item updated successfully",
  })
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Put(":id")
  update(@Param("id") id: number, @Body() updatePrescriptionItemDto: UpdatePrescriptionItemDto) {
    return this.prescriptionItemsService.update(id, updatePrescriptionItemDto);
  }
  
  @ApiOperation({
    summary: "Delete prescription item (Creator or Admin only)",
  })
  @ApiResponse({
    status: 200,
    description: "Prescription item deleted successfully",
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @UseGuards(CreatorGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.prescriptionItemsService.remove(id);
  }
}
