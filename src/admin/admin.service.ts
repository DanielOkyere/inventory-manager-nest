import { Injectable } from "@nestjs/common";
import { Admin } from "./entities/admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const {password} = createAdminDto;
    const salt =  bcrypt.genSaltSync();
    const hash =  bcrypt.hashSync(password, salt);
    const dto:CreateAdminDto = {
      ...createAdminDto,
      password: hash,
      salt,
    }
    return this.adminRepository.save(createAdminDto);
  }

  findAll() {
    return this.adminRepository.find();
  }

  findOne(id: number) {
    return this.adminRepository.findOne(+id);
  }

  update(id: number, updateAdminDto: Admin) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
