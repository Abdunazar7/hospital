import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import type { Response } from "express";

import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { LoginAdminDto } from "./dto/admin-login.dto";

import { UserRole } from "../app.constants";
import { Roles } from "../app.constants";

import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreatorGuard } from "../common/guards/creator.guard";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";

@ApiTags("Admins")
@ApiBearerAuth("JWT-auth")
@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: "Create a new admin (Creator Admin only)" })
  @ApiResponse({
    status: 201,
    description: "Admin created successfully",
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard, CreatorGuard)
  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateAdminDto) {
    return this.adminsService.create(dto);
  }

  @ApiOperation({ summary: "Login admin" })
  @ApiResponse({ status: 200, description: "Login successful" })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() dto: LoginAdminDto, @Res({ passthrough: true }) res: Response) {
    return this.adminsService.login(dto, res);
  }

  @ApiOperation({ summary: "Logout admin (ADMIN only)" })
  @ApiResponse({ status: 200, description: "Logged out successfully" })
  @Post("logout")
  logout(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminsService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: "Refresh admin access token" })
  @ApiResponse({ status: 200, description: "Token refreshed" })
  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminsService.refreshToken(id, refreshToken, res);
  }

  @ApiOperation({ summary: "Get all admins (Admin or Creator Admin)" })
  @ApiResponse({ status: 200, description: "List of all admins" })
  @Roles(UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @ApiOperation({ summary: "Get admin by ID (Admin or Creator Admin)" })
  @ApiResponse({ status: 200, description: "Admin found" })
  @Roles(UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.adminsService.findOne(id);
  }

  @ApiOperation({ summary: "Update admin (Creator Admin only)" })
  @ApiResponse({ status: 200, description: "Admin updated successfully" })
  @Roles(UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard, CreatorGuard)
  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateAdminDto) {
    return this.adminsService.update(id, dto);
  }

  @ApiOperation({ summary: "Delete admin (Creator Admin only)" })
  @ApiResponse({ status: 200, description: "Admin deleted successfully" })
  @Roles(UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard, CreatorGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.adminsService.remove(id);
  }
}
