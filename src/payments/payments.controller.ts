import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: "Create a new payment" })
  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(dto);
  }

  @ApiOperation({ summary: "Get all payments" })
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @ApiOperation({ summary: "Get a payment by ID" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update payment information" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, dto);
  }

  @ApiOperation({ summary: "Delete a payment" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
