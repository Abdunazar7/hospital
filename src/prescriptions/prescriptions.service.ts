import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Prescription } from "./models/prescription.model";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";

@Injectable()
export class PrescriptionsService {
  constructor(@InjectModel(Prescription) private repo: typeof Prescription) {}

  create(createPrescriptionDto: CreatePrescriptionDto) {
    return this.repo.create(createPrescriptionDto);
  }
  findAll() {
    return this.repo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const p = await this.repo.findByPk(id, { include: { all: true } });
    if (!p) throw new NotFoundException("Prescription not found");
    return p;
  }

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    const p = await this.findOne(id);
    return p.update(updatePrescriptionDto);
  }

  async remove(id: number) {
    const p = await this.findOne(id);
    await p.destroy();
    return { message: "Prescription deleted" };
  }
}
