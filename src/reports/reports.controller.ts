import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ReportsService } from "./reports.service";
import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles, UserRole } from "../app.constants";

@ApiTags("Reports")
@Controller("reports")
// @UseGuards(UserAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOperation({ summary: "Top 5 doctors by appointments" })
  // @Roles(UserRole.ADMIN)
  @Get("top-doctors")
  topDoctors() {
    return this.reportsService.topDoctors();
  }

  @ApiOperation({ summary: "Top 5 patients by payment amount" })
  // @Roles(UserRole.ADMIN)
  @Get("top-patients")
  topPatients() {
    return this.reportsService.topPatients();
  }

  @ApiOperation({ summary: "Monthly revenue report" })
  // @Roles(UserRole.ADMIN)
  @Get("monthly-revenue")
  monthlyRevenue() {
    return this.reportsService.monthlyRevenue();
  }

  @ApiOperation({ summary: "Doctor performance analytics" })
  // @Roles(UserRole.ADMIN)
  @Get("doctor-performance")
  doctorPerformance() {
    return this.reportsService.doctorPerformance();
  }

  @ApiOperation({ summary: "Lab test statistics by status" })
  // @Roles(UserRole.ADMIN)
  @Get("lab-test-stats")
  labTestStats() {
    return this.reportsService.labTestStats();
  }
}
