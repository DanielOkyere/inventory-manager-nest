import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards
} from "@nestjs/common";
import { ExpenditureService } from "./expenditure.service";
import { CreateExpenditureDto } from "./dto/create-expenditure.dto";
import { UpdateExpenditureDto } from "./dto/update-expenditure.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.gaurd";

@Controller("expenditure")
export class ExpenditureController {
  constructor(private readonly expenditureService: ExpenditureService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createExpenditureDto: CreateExpenditureDto, @Req() user:CreateUserDto) {
    const dto = {
      ...createExpenditureDto,
      user_id: user.id
    }
    return this.expenditureService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.expenditureService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.expenditureService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateExpenditureDto: UpdateExpenditureDto
  ) {
    return this.expenditureService.update(+id, updateExpenditureDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.expenditureService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/user/:id")
  getUserExpenditures(@Param("id") id: string) {
    return this.expenditureService.getUserExpenditures(+id);
  }
}
