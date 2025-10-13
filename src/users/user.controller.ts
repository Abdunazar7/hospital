import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UsersService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../app.constants";
import { UserRole } from "../app.constants";
import { Use } from "nestjs-telegraf";
import { SelfGuard } from "../common/guards/self.guard";

@ApiTags("Users")
@ApiBearerAuth("JWT-auth")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Activate user by email link" })
  @ApiResponse({ status: 200, description: "User activated successfully" })
  @Get("activate/:link")
  @HttpCode(200)
  activateUser(@Param("link") link: string) {
    return this.usersService.activateUser(link);
  }

  // @ApiOperation({ summary: "Register a new user" })
  // @ApiResponse({ status: 201, description: "User created successfully" })
  // @Post()
  // @HttpCode(201)
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @ApiOperation({ summary: "Get all users (Admin only)" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Get user by ID" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT, UserRole.USER)
  @UseGuards(SelfGuard)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: "Update user info (Admin or self)" })
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT, UserRole.USER)
  @UseGuards(SelfGuard)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Put(":id")
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "Delete user (Admin only)" })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(UserAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.usersService.remove(id);
  }
}
