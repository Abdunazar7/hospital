import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Appointment } from "./models/appointment.model";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment)
    private readonly appointmentModel: typeof Appointment
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentModel.create(createAppointmentDto);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentModel.findByPk(id, {
      include: { all: true },
    });
    if (!appointment) throw new NotFoundException("Appointment not found");
    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);
    return appointment.update(updateAppointmentDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const appointment = await this.findOne(id);
    await appointment.destroy();
    return { message: "Appointment deleted successfully" };
  }
}
