import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Request,
} from "@nestjs/common";
import { Role } from "src/role.enum";
import { Roles } from "src/roles.decorator";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcrypt";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService,
  ) {}

  @Post("/signup")
  async create(@Body() createAdminDto: CreateAdminDto) {
    await this.adminService.create(createAdminDto);
    return "Admin Created Successufully";
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @Roles(Role.Admin)
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

}
