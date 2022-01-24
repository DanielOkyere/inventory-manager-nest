import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validate(id: number, pass: string): Promise<any> {
    const user = await this.userService.findOne(id);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
