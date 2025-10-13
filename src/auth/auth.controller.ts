import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import type { Response } from "express";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDtoUserDto } from "../users/dto/login.dto";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "User Registration" })
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: "User Login" })
  @Post("login")
  @HttpCode(HttpStatus.OK)
  signin(
    @Body() loginDto: LoginDtoUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(loginDto, res);
  }

  @ApiOperation({ summary: "User Logout" })
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logout(refreshToken, res);
  }
  
  @ApiOperation({ summary: "Refresh Access Token" })
  @Post(":id/refresh")
  @HttpCode(HttpStatus.OK)
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
