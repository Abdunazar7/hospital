import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { UsersService } from "../users/user.service";
import { UserRole } from "../app.constants";

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private doctorModel: typeof Doctor,
    private readonly usersService: UsersService
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const { user_id } = createDoctorDto;

    const user = await this.usersService.findOne(user_id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.role !== UserRole.USER) {
      throw new BadRequestException(
        `User with ID ${user.id} already has role: ${user.role}`
      );
    }

    const existing = await this.doctorModel.findOne({ where: { user_id } });
    if (existing) {
      throw new BadRequestException("Doctor already exists for this user");
    }

    const doctor = await this.doctorModel.create(createDoctorDto);

    await this.usersService.updateRole(user_id, UserRole.DOCTOR);

    return {
      message: "Doctor created successfully",
      doctor,
    };
  }

  async findAll() {
    return this.doctorModel.findAll({ include: { all: true } });
  }

  async findByUserId(userId: number) {
    return this.doctorModel.findOne({ where: { user_id: userId } });
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
