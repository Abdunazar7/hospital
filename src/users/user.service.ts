import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { User } from "./models/user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly mailService: MailService
  ) {}

  async activateUser(link: string): Promise<any> {
    if (!link) throw new BadRequestException("Activation link not found");

    const [_, updatedUsers] = await this.userModel.update(
      { is_active: true },
      {
        where: { activation_link: link, is_active: false },
        returning: true,
      }
    );

    const updatedUser = updatedUsers[0];
    if (!updatedUser) {
      throw new BadRequestException("User already activated or invalid link");
    }

    return {
      message: "User successfully activated",
      is_active: updatedUser.is_active,
    };
  }

  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      await this.mailService.sendMail(user);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Error sending activation email");
    }

    return user;
  }

  findAll() {
    return this.userModel.findAll({include: {all: true} });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id, { include: { all: true } });
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ where: { email }, include: {all: true} });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [count, users] = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    if (!count) throw new BadRequestException("User not found");
    return users[0];
  }

  async remove(id: number) {
    const deleted = await this.userModel.destroy({ where: { id } });
    if (!deleted) throw new BadRequestException("User not found");
    return { message: "User deleted successfully" };
  }
}
