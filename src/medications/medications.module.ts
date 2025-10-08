import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MedicationsController } from "./medications.controller";
import { MedicationsService } from "./medications.service";
import { Medication } from "./models/medication.model";
import { PrescriptionItem } from "../prescription_items/models/prescription_item.model";

@Module({
  imports: [SequelizeModule.forFeature([Medication, PrescriptionItem])],
  controllers: [MedicationsController],
  providers: [MedicationsService],
  exports: [MedicationsService],
})
export class MedicationsModule {}
