import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { Payment } from "./models/payment.model";
import { Patient } from "../patients/models/patient.model";
import { Appointment } from "../appointments/models/appointment.model";

@Module({
  imports: [SequelizeModule.forFeature([Payment, Patient, Appointment])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
