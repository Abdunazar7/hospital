import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { LabTestsController } from "./lab_tests.controller";
import { LabTestsService } from "./lab_tests.service";
import { LabTest } from "./models/lab_test.model";
import { Appointment } from "../appointments/models/appointment.model";
import { Doctor } from "../doctors/models/doctor.model";
import { Patient } from "../patients/models/patient.model";

@Module({
  imports: [
    SequelizeModule.forFeature([LabTest, Appointment, Doctor, Patient]),
  ],
  controllers: [LabTestsController],
  providers: [LabTestsService],
  exports: [LabTestsService],
})
export class LabTestsModule {}
