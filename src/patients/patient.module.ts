import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PatientsService } from "./patient.service";
import { PatientsController } from "./patient.controller";
import { Patient } from "./models/patient.model";
import { User } from "../users/models/user.model";

@Module({
  imports: [SequelizeModule.forFeature([Patient, User])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
