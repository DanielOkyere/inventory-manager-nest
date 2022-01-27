import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly users:Promise<User[]> = this.userRepository.find();
  
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

    return this.userRepository.save(dto);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(+id);
  }

  async findUserByEmail(email: string): Promise<User| undefined> {
    return (await this.users).find(user => user.email === email);
  }

}
