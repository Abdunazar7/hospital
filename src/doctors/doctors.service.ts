import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";

@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor) private doctorModel: typeof Doctor) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorModel.create(createDoctorDto);
    return {
      message: "Doctor created successfully",
      doctor,
    };
  }

  async findAll() {
    return this.doctorModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const doctor = await this.doctorModel.findByPk(id, {
      include: { all: true },
    });
    if (!doctor) throw new NotFoundException("Doctor not found");
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.findOne(id);
    await doctor.update(updateDoctorDto);
    return {
      message: "Doctor updated successfully",
      doctor,
    };
  }

  async remove(id: number) {
    const doctor = await this.findOne(id);
    await doctor.destroy();
    return { message: "Doctor deleted successfully" };
  }
}
