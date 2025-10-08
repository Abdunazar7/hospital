import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { LabTest } from "./models/lab_test.model";
import { CreateLabTestDto } from "./dto/create-lab_test.dto";
import { UpdateLabTestDto } from "./dto/update-lab_test.dto";

@Injectable()
export class LabTestsService {
  constructor(@InjectModel(LabTest) private labTestModel: typeof LabTest) {}

  create(createLabTestDto: CreateLabTestDto) {
    return this.labTestModel.create(createLabTestDto);
  }

  findAll() {
    return this.labTestModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const lab = await this.labTestModel.findByPk(id, { include: { all: true } });
    if (!lab) throw new NotFoundException("Lab test not found");
    return lab;
  }

  async update(id: number, updateLabTestDto: UpdateLabTestDto) {
    const lab = await this.findOne(id);
    return lab.update(updateLabTestDto);
  }

  async remove(id: number) {
    const lab = await this.findOne(id);
    await lab.destroy();
    return { message: "Lab test deleted successfully" };
  }
}
