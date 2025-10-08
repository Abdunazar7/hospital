import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient
  ) {}

  create(dto: CreatePatientDto) {
    return this.patientModel.create(dto);
  }

  findAll() {
    return this.patientModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const patient = await this.patientModel.findByPk(id, {
      include: { all: true },
    });
    if (!patient) throw new NotFoundException("Patient not found");
    return patient;
  }

  async update(id: number, dto: UpdatePatientDto) {
    const [count, updated] = await this.patientModel.update(dto, {
      where: { id },
      returning: true,
    });
    if (!count) throw new NotFoundException("Patient not found");
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.patientModel.destroy({ where: { id } });
    if (!deleted) throw new NotFoundException("Patient not found");
    return { message: "Patient deleted successfully" };
  }
}
