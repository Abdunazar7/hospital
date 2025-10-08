import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MedicalRecord } from "./models/medical_record.model";
import { CreateMedicalRecordDto } from "./dto/create-medical_record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical_record.dto";

@Injectable()
export class MedicalRecordsService {
  constructor(@InjectModel(MedicalRecord) private medicalRecordModel: typeof MedicalRecord) {}

  create(createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordModel.create(createMedicalRecordDto);
  }

  findAll() {
    return this.medicalRecordModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const rec = await this.medicalRecordModel.findByPk(id, { include: { all: true } });
    if (!rec) throw new NotFoundException("Medical record not found");
    return rec;
  }

  async update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    const rec = await this.findOne(id);
    return rec.update(updateMedicalRecordDto);
  }

  async remove(id: number) {
    const rec = await this.findOne(id);
    await rec.destroy();
    return { message: "Medical record deleted" };
  }
}
