import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from "@nestjs/common";
import { Role } from "src/role.enum";
import { Roles } from "src/roles.decorator";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  // @Roles(Role.Admin)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  // @Roles(Role.Admin)
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  // @Roles(Role.Admin)
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }


}
