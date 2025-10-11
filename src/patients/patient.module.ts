import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PatientsController } from "./patient.controller";
import { PatientsService } from "./patient.service";
import { Patient } from "./models/patient.model";
import { User } from "../users/models/user.model";
import { Appointment } from "../appointments/models/appointment.model";
import { Payment } from "../payments/models/payment.model";
import { MedicalRecord } from "../medical_records/models/medical_record.model";
import { UsersModule } from "../users/user.module";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Patient,
      User,
      Appointment,
      Payment,
      MedicalRecord,
    ]),
    UsersModule,
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
