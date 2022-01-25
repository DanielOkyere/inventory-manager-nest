import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateExpenditureDto } from "./dto/create-expenditure.dto";
import { UpdateExpenditureDto } from "./dto/update-expenditure.dto";
import { Expenditure } from "./entities/expenditure.entity";

@Injectable()
export class ExpenditureService {
  constructor(
    @InjectRepository(Expenditure)
    private expenditureRepository: Repository<Expenditure>
  ){}
  create(createExpenditureDto: CreateExpenditureDto) {
    return "This action adds a new expenditure";
  }

  findAll() {
    return `This action returns all expenditure`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenditure`;
  }

  update(id: number, updateExpenditureDto: UpdateExpenditureDto) {
    return `This action updates a #${id} expenditure`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenditure`;
  }
}
