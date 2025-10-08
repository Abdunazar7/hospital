import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private readonly doctorModel: typeof Doctor
  ) {}

  create(dto: CreateDoctorDto) {
    return this.doctorModel.create(dto);
  }

  findAll() {
    return this.doctorModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const doctor = await this.doctorModel.findByPk(id, {
      include: { all: true },
    });
    if (!doctor) throw new NotFoundException("Doctor not found");
    return doctor;
  }

  async update(id: number, dto: UpdateDoctorDto) {
    const [count, updated] = await this.doctorModel.update(dto, {
      where: { id },
      returning: true,
    });
    if (!count) throw new NotFoundException("Doctor not found");
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.doctorModel.destroy({ where: { id } });
    if (!deleted) throw new NotFoundException("Doctor not found");
    return { message: "Doctor deleted successfully" };
  }
}
