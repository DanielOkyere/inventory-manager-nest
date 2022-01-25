import { Module } from "@nestjs/common";
import { ExpenditureService } from "./expenditure.service";
import { ExpenditureController } from "./expenditure.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Expenditure } from "./entities/expenditure.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Expenditure])],
  controllers: [ExpenditureController],
  providers: [ExpenditureService],
  exports: [ExpenditureService]
})
export class ExpenditureModule {}
