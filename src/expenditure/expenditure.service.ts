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
    return this.expenditureRepository.save(createExpenditureDto);
  }

  findAll() {
    return this.expenditureRepository.find();
  }

  findOne(id: number) {
    return this.expenditureRepository.findOne(+id);
  }

  update(id: number, updateExpenditureDto: UpdateExpenditureDto) {
    return `This action updates a #${id} expenditure`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenditure`;
  }
}
