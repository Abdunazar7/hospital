import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Prescription } from "./models/prescription.model";
import { PrescriptionsService } from "./prescriptions.service";
import { PrescriptionsController } from "./prescriptions.controller";
import { MedicalRecord } from "../medical_records/models/medical_record.model";
import { PrescriptionItem } from "../prescription_items/models/prescription_item.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Prescription, MedicalRecord, PrescriptionItem]),
  ],
  providers: [PrescriptionsService],
  controllers: [PrescriptionsController],
  exports: [PrescriptionsService],
})
export class PrescriptionsModule {}
