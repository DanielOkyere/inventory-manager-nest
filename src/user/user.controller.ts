import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
  Inject,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.gaurd";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

  @Post("/signup")
  create(@Body() createUserDto: CreateUserDto) {
    try{
    return this.userService.create(createUserDto);
    }catch(e){
      this.logger.error(e);
      return "Failed to create user";
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    try{
    return this.userService.findAll();
    }catch(e){
      this.logger.error(e);
      return "Failed to get all users";
    }
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: number) {
    try {
    return this.userService.findOne(+id);
    } catch (e) {
      this.logger.error(e);
      return `Failed to get user with id: \`\${id}\`${id}`;
    }
  }

}
