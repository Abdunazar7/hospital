import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { DoctorsService } from "./doctors.service";
import { DoctorsController } from "./doctors.controller";
import { Doctor } from "./models/doctor.model";
import { User } from "../users/models/user.model";

@Module({
  imports: [SequelizeModule.forFeature([Doctor, User])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
