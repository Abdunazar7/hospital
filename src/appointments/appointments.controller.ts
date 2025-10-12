import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpCode,
  ForbiddenException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";

import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";

import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { CreatorGuard } from "../common/guards/creator.guard";

@ApiTags("Appointments")
@ApiBearerAuth("JWT-auth") 
@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ApiOperation({ summary: "Create a new appointment (PATIENT only)" })
  @ApiResponse({ status: 201, description: "Appointment successfully created" })
  @Roles(UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Post()
  @HttpCode(201)
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @ApiOperation({ summary: "Get all appointments (ADMIN, DOCTOR)" })
  @ApiResponse({ status: 200, description: "List of all appointments" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @ApiOperation({ summary: "Get appointment by ID (Admin/Doctor/Patient)" })
  @ApiResponse({ status: 200, description: "Appointment found" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: number) {
    const appointment = await this.appointmentsService.findOne(id);
    if (!appointment)
      throw new ForbiddenException("Appointment not found or access denied");
    return appointment;
  }

  @ApiOperation({ summary: "Update appointment (Doctor/Admin)" })
  @ApiResponse({ status: 200, description: "Appointment updated successfully" })
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Put(":id")
  update(@Param("id") id: number, @Body() updateDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, updateDto);
  }

  @ApiOperation({ summary: "Delete appointment (Creator Admin only)" })
  @ApiResponse({ status: 200, description: "Appointment deleted successfully" })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @UseGuards(CreatorGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.appointmentsService.remove(id);
  }
}
