import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Prescription } from "./models/prescription.model";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";

@Injectable()
export class PrescriptionsService {
  constructor(@InjectModel(Prescription) private prescriptionModel: typeof Prescription) {}

  create(createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionModel.create(createPrescriptionDto);
  }

  findAll() {
    return this.prescriptionModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const prescription = await this.prescriptionModel.findByPk(id, { include: { all: true } });
    if (!prescription) throw new NotFoundException("Prescription not found");
    return prescription;
  }

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    const prescription = await this.findOne(id);
    return prescription.update(updatePrescriptionDto);
  }

  async remove(id: number) {
    const prescription = await this.findOne(id);
    await prescription.destroy();
    return { message: "Prescription deleted" };
  }
}
