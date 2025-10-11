import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";

@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: "Create a new payment" })
  @Post()
  @HttpCode(201)
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @ApiOperation({ summary: "Get all payments" })
  @ApiResponse({ status: 200, description: "List of all payments" })
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @ApiOperation({ summary: "Get payment by ID" })
  @ApiResponse({ status: 200, description: "Payment details" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.paymentsService.findOne(id);
  }

  @ApiOperation({ summary: "Update payment information" })
  @ApiResponse({ status: 200, description: "Payment updated successfully" })
  @Put(":id")
  update(@Param("id") id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @ApiOperation({ summary: "Delete a payment" })
  @ApiResponse({ status: 200, description: "Payment deleted successfully" })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.paymentsService.remove(id);
  }
}
