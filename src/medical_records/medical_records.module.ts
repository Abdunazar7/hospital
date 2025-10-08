import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MedicalRecord } from "./models/medical_record.model";
import { MedicalRecordsService } from "./medical_records.service";
import { MedicalRecordsController } from "./medical_records.controller";
import { Appointment } from "../appointments/models/appointment.model";
import { LabTest } from "../lab_tests/models/lab_test.model";
import { Prescription } from "../prescriptions/models/prescription.model";

@Module({
  imports: [
    SequelizeModule.forFeature([
      MedicalRecord,
      Appointment,
      LabTest,
      Prescription,
    ]),
  ],
  providers: [MedicalRecordsService],
  controllers: [MedicalRecordsController],
  exports: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
