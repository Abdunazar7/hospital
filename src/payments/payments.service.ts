import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment) private paymentRepo: typeof Payment) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentRepo.create(createPaymentDto);
    return {
      message: "Payment created successfully",
      payment,
    };
  }

  findAll() {
    return this.paymentRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const payment = await this.paymentRepo.findByPk(id, {
      include: { all: true },
    });
    if (!payment) throw new NotFoundException("Payment not found");
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.findOne(id);
    await payment.update(updatePaymentDto);
    return {
      message: "Payment updated successfully",
      payment,
    };
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    await payment.destroy();
    return { message: "Payment deleted successfully" };
  }
}
