import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { Response } from "express";
import * as bcrypt from "bcrypt";

import { User } from "../users/models/user.model";
import { UsersService } from "../users/user.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDtoUserDto } from "../users/dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  private async generateTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      role: user.role,
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

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email
    );
    if (existingUser) {
      throw new ConflictException("A user with this email already exists.");
    }

    const newUser = await this.usersService.create(createUserDto);
    return {
      message: "User registered successfully. Please verify your email.",
      userId: newUser,
    };
  }

  async login(loginDto: LoginDtoUserDto, res: Response) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException("Invalid email or password.");

    const passwordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if (!passwordValid)
      throw new UnauthorizedException("Invalid email or password.");

    const { accessToken, refreshToken } = await this.generateTokens(user);

    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Login successful.",
      userId: user.id,
      access_token: accessToken,
    };
  }

  async logout(refreshToken: string, res: Response) {
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token missing.");
    }

    const userData = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const user = await this.usersService.findOne(userData.id);
    if (!user) throw new UnauthorizedException("User not found.");

    user.refresh_token = "";
    await user.save();

    res.clearCookie("refreshToken");
    return { message: "User logged out successfully." };
  }

  async refreshToken(userId: number, refresh_token: string, res: Response) {
    if (!refresh_token) {
      throw new ForbiddenException("Refresh token not found.");
    }

    const decoded = this.jwtService.decode(refresh_token);
    if (userId !== decoded["id"]) {
      throw new ForbiddenException("Token does not belong to this user.");
    }

    const user = await this.usersService.findOne(userId);
    if (!user || !user.refresh_token) {
      throw new ForbiddenException("User not authorized.");
    }

    const valid = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!valid) throw new ForbiddenException("Invalid refresh token.");

    const { accessToken, refreshToken } = await this.generateTokens(user);

    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Access token refreshed successfully.",
      userId: user.id,
      access_token: accessToken,
    };
  }
}
