import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly users = [];
  
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

   async create(createUserDto: CreateUserDto) {
    const {password} = createUserDto;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password,salt);
    const dto:CreateUserDto = {
      ...createUserDto,
      password: hash,
      salt,
    }
    await this.userRepository.save(dto);
    return "User Added Successfully";
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(+id);
  }

  async findUserByEmail(email: string): Promise<CreateUserDto> {
    return (await this.users).find(user => user.email === email);
  }

}
