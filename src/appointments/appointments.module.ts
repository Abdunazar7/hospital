import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Appointment } from "./models/appointment.model";
import { AppointmentsService } from "./appointments.service";
import { AppointmentsController } from "./appointments.controller";
import { PatientsModule } from "../patients/patient.module";
import { DoctorsModule } from "../doctors/doctors.module";

@Module({
  imports: [SequelizeModule.forFeature([Appointment]), PatientsModule, DoctorsModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService]
})
export class AppointmentsModule {}
