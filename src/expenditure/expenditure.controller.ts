import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req
} from "@nestjs/common";
import { ExpenditureService } from "./expenditure.service";
import { CreateExpenditureDto } from "./dto/create-expenditure.dto";
import { UpdateExpenditureDto } from "./dto/update-expenditure.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";

@Controller("expenditure")
export class ExpenditureController {
  constructor(private readonly expenditureService: ExpenditureService) {}

  @Post()
  create(@Body() createExpenditureDto: CreateExpenditureDto, @Req() user:CreateUserDto) {
    const dto = {
      ...createExpenditureDto,
      user_id: user.id
    }
    return this.expenditureService.create(dto);
  }

  @Get()
  findAll() {
    return this.expenditureService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.expenditureService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateExpenditureDto: UpdateExpenditureDto
  ) {
    return this.expenditureService.update(+id, updateExpenditureDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.expenditureService.remove(+id);
  }
}
