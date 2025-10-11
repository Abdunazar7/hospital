import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { UsersService } from "../users/user.service";
import { UserRole } from "../app.constants";

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    private readonly usersService: UsersService
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const { user_id } = createPatientDto;

    // 1️⃣ User mavjudligini tekshirish
    const user = await this.usersService.findOne(user_id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // 2️⃣ Faqat USER role li foydalanuvchilarga PATIENT bo‘lish ruxsat beramiz
    if (user.role !== UserRole.USER) {
      throw new BadRequestException(
        `User with ID ${user.id} already has a role: ${user.role}`
      );
    }

    // 3️⃣ Agar user allaqachon patient bo‘lsa — xatolik
    const existing = await this.patientModel.findOne({ where: { user_id } });
    if (existing) {
      throw new BadRequestException("Patient already exists for this user");
    }

    // 4️⃣ Patient yaratish
    const patient = await this.patientModel.create({ ...createPatientDto });

    // 5️⃣ User roli o‘zgartiriladi (USER → PATIENT)
    await this.usersService.updateRole(user_id, UserRole.PATIENT);

    return {
      message: "Patient created successfully",
      patient,
    };
  }

  async findAll() {
    return this.patientModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const patient = await this.patientModel.findByPk(id, {
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
