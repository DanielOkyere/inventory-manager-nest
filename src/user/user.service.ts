import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly users = this.findAll().then(
   users => users.map(user => ({
      id: user.id,
      email: user.email,
      roles: user.roles,
      firstName: user.firstName,
      password: user.password,
      salt: user.salt,
      lastName: user.lastName,})
  ));
  
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

   findUserByEmail(email: string) {
    return  this.users.then(users => users.find(user => (user.email === email)? user : null));
  }

}
