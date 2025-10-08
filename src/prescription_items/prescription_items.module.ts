import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PrescriptionItem } from "./models/prescription_item.model";
import { PrescriptionItemsService } from "./prescription_items.service";
import { PrescriptionItemsController } from "./prescription_items.controller";
import { Prescription } from "../prescriptions/models/prescription.model";
import { Medication } from "../medications/models/medication.model";

@Module({
  imports: [
    SequelizeModule.forFeature([PrescriptionItem, Prescription, Medication]),
  ],
  providers: [PrescriptionItemsService],
  controllers: [PrescriptionItemsController],
  exports: [PrescriptionItemsService],
})
export class PrescriptionItemsModule {}
