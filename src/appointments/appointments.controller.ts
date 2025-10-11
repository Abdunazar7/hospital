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
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";

@ApiTags("Appointments")
@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ApiOperation({ summary: "Create a new appointment" })
  @ApiResponse({ status: 201, description: "Appointment successfully created" })
  @Post()
  @HttpCode(201)
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @ApiOperation({ summary: "Get all appointments" })
  @ApiResponse({ status: 200, description: "List of all appointments" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @ApiOperation({ summary: "Get appointment by ID" })
  @ApiResponse({ status: 200, description: "Appointment found" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT)
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.appointmentsService.findOne(id);
  }

  @ApiOperation({ summary: "Update appointment" })
  @Put(":id")
  update(@Param("id") id: number, @Body() updateDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, updateDto);
  }

  @ApiOperation({ summary: "Delete appointment" })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.appointmentsService.remove(id);
  }
}
