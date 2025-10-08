import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PrescriptionItem } from "./models/prescription_item.model";
import { CreatePrescriptionItemDto } from "./dto/create-prescription_item.dto";
import { UpdatePrescriptionItemDto } from "./dto/update-prescription_item.dto";

@Injectable()
export class PrescriptionItemsService {
  constructor(
    @InjectModel(PrescriptionItem) private repo: typeof PrescriptionItem
  ) {}

  create(createPrescriptionItemDto: CreatePrescriptionItemDto) {
    return this.repo.create(createPrescriptionItemDto);
  }
  findAll() {
    return this.repo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const r = await this.repo.findByPk(id, { include: { all: true } });
    if (!r) throw new NotFoundException("Prescription item not found");
    return r;
  }

  async update(id: number, updatePrescriptionItemDto: UpdatePrescriptionItemDto) {
    const r = await this.findOne(id);
    return r.update(updatePrescriptionItemDto);
  }

  async remove(id: number) {
    const r = await this.findOne(id);
    await r.destroy();
    return { message: "Prescription item deleted" };
  }
}
