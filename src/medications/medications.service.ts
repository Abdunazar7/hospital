import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Medication } from "./models/medication.model";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";

@Injectable()
export class MedicationsService {
  constructor(
    @InjectModel(Medication) private medicationModel: typeof Medication
  ) {}

  create(createMedicationDto: CreateMedicationDto) {
    return this.medicationModel.create(createMedicationDto);
  }

  findAll() {
    return this.medicationModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const med = await this.medicationModel.findByPk(id, {
      include: { all: true },
    });
    if (!med) throw new NotFoundException("Medication not found");
    return med;
  }

  async update(id: number, updateMedicationDto: UpdateMedicationDto) {
    const med = await this.findOne(id);
    return med.update(updateMedicationDto);
  }

  async remove(id: number) {
    const med = await this.findOne(id);
    await med.destroy();
    return { message: "Medication deleted successfully" };
  }
}
