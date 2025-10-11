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
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { LoginAdminDto } from "./dto/admin-login.dto";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import type { Response } from "express";

@ApiTags("Admins")
@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: "Create a new admin" })
  @Post()
  create(@Body() dto: CreateAdminDto) {
    return this.adminsService.create(dto);
  }

  @ApiOperation({ summary: "Login admin" })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() dto: LoginAdminDto, @Res({ passthrough: true }) res: Response) {
    return this.adminsService.login(dto, res);
  }

  @ApiOperation({ summary: "Logout admin" })
  @Post("logout")
  logout(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminsService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: "Refresh admin token" })
  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminsService.refreshToken(id, refreshToken, res);
  }

  @ApiOperation({ summary: "Get all admins" })
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @ApiOperation({ summary: "Get admin by ID" })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.adminsService.findOne(id);
  }

  @ApiOperation({ summary: "Update admin by ID" })
  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateAdminDto) {
    return this.adminsService.update(id, dto);
  }

  @ApiOperation({ summary: "Delete admin by ID" })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.adminsService.remove(id);
  }
}
