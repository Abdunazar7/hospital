import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientRepo: typeof Patient
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const patient = await this.patientRepo.create(createPatientDto);
    return { message: "Patient created successfully", patient };
  }

  async findAll() {
    return this.patientRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const patient = await this.patientRepo.findByPk(id, {
      include: { all: true },
    });
    if (!patient) throw new NotFoundException("Patient not found");
    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.findOne(id);
    await patient.update(updatePatientDto);
    return { message: "Patient updated successfully", patient };
  }

  async remove(id: number) {
    const patient = await this.findOne(id);
    await patient.destroy();
    return { message: "Patient deleted successfully" };
  }
}
