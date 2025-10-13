import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ReportsService } from "./reports.service";
import { ReportsController } from "./reports.controller";

@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
