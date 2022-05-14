import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Request,
  Inject,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { JwtAuthGuard } from "src/auth/jwt-auth.gaurd";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
    }

  @Post("/signup")
  async create(@Body() createAdminDto: CreateAdminDto) {
    try{
    await this.adminService.create(createAdminDto);
    return "Admin Created Successufully";
    }catch(e){
      this.logger.error(e);
      return "Failed to create admin";
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    try{
    return this.adminService.findAll();
    }catch(e){
      this.logger.error(e);
      return "Failed to get all admins";
    }
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string) {
    try{
    return this.adminService.findOne(+id);
    }catch(e){
      this.logger.error(e);
      return `Failed to get admin with id: \`\${id}\`${id}`;
    }
  }

}
