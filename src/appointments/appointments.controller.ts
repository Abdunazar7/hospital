import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";

@ApiTags("Appointments")
@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ApiOperation({ summary: "Create new appointment" })
  @ApiResponse({ status: 201, description: "Appointment successfully created" })
  @Post()
  create(@Body() createDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createDto);
  }

  @ApiOperation({ summary: "Get all appointments" })
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @ApiOperation({ summary: "Get appointment by ID" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.appointmentsService.findOne(id);
  }

  @ApiOperation({ summary: "Update appointment" })
  @Patch(":id")
  update(@Param("id") id: number, @Body() updateDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, updateDto);
  }

  @ApiOperation({ summary: "Delete appointment" })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.appointmentsService.remove(id);
  }
}
