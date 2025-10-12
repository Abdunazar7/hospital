import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ReportsService } from "./reports.service";
import { ReportsController } from "./reports.controller";

@Module({
  imports: [SequelizeModule.forFeature([])], // faqat raw querylar uchun
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
