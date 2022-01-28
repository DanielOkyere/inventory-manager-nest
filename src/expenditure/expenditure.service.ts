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

  async update(id: number, updateExpenditureDto: UpdateExpenditureDto) {
    await this.expenditureRepository.update(id, updateExpenditureDto);
    return `Expenditure with id: ${id} has been updated`;
  }

  async remove(id: number) {
    await this.expenditureRepository.delete(id);
    return `Expenditure with id: ${id} has been deleted`;
  }

  getUserExpenditures(id: number) {
    return this.expenditureRepository.find({
      where: {
        user_id: id
      }});
  }
}
