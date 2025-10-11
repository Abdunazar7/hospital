import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { DoctorsController } from "./doctors.controller";
import { DoctorsService } from "./doctors.service";
import { Doctor } from "./models/doctor.model";
import { User } from "../users/models/user.model";
import { Appointment } from "../appointments/models/appointment.model";
import { MedicalRecord } from "../medical_records/models/medical_record.model";
import { UsersModule } from "../users/user.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Doctor, User, Appointment, MedicalRecord]),
    UsersModule,
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
