import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { LoginAdminDto } from "./dto/admin-login.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { UserRole } from "../app.constants";

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    private readonly jwtService: JwtService
  ) {}

  private async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
      is_active: admin.is_active,
      role: admin.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async create(dto: CreateAdminDto) {
    const existing = await this.adminModel.findOne({
      where: { email: dto.email },
    });
    if (existing)
      throw new ConflictException("Admin with this email already exists");

    if (dto.is_creator) {
      const alreadyCreator = await this.adminModel.findOne({
        where: { is_creator: true },
      });
      if (alreadyCreator)
        throw new BadRequestException("There can be only one creator admin");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 7);
    const admin = await this.adminModel.create({
      ...dto,
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    return { message: "Admin created successfully", admin };
  }

  async login(dto: LoginAdminDto, res: Response) {
    const admin = await this.adminModel.findOne({
      where: { email: dto.email },
    });
    if (!admin) throw new UnauthorizedException("Invalid email or password");

    const valid = await bcrypt.compare(dto.password, admin.password);
    if (!valid) throw new UnauthorizedException("Invalid email or password");

    const { accessToken, refreshToken } = await this.generateTokens(admin);
    admin.refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return { message: "Login successful", accessToken, adminId: admin.id };
  }

  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const admin = await this.adminModel.findByPk(adminData.id);
    if (!admin) throw new NotFoundException("Admin not found");

    admin.refresh_token = null;
    await admin.save();

    res.clearCookie("refreshToken");
    return { message: "Logged out successfully" };
  }

  async refreshToken(adminId: number, refreshToken: string, res: Response) {
    const admin = await this.adminModel.findByPk(adminId);
    if (!admin) throw new NotFoundException("Admin not found");

    if (!admin.refresh_token)
      throw new ForbiddenException("No refresh token found");

    const match = await bcrypt.compare(refreshToken, admin.refresh_token);
    if (!match) throw new ForbiddenException("Invalid refresh token");

    const { accessToken, refreshToken: newRefresh } =
      await this.generateTokens(admin);

    admin.refresh_token = await bcrypt.hash(newRefresh, 7);
    await admin.save();

    res.cookie("refreshToken", newRefresh, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return { message: "Token refreshed", accessToken, adminId: admin.id };
  }

  async findAll() {
    return this.adminModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id, {
      include: { all: true },
    });
    if (!admin) throw new NotFoundException("Admin not found");
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    const [count, admins] = await this.adminModel.update(dto, {
      where: { id },
      returning: true,
    });
    if (!count) throw new NotFoundException("Admin not found");
    return { message: "Admin updated", admin: admins[0] };
  }

  async remove(id: number) {
    const deleted = await this.adminModel.destroy({ where: { id } });
    if (!deleted) throw new NotFoundException("Admin not found");
    return { message: "Admin deleted successfully" };
  }
}
