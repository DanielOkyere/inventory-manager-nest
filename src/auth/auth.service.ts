import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "src/admin/admin.service";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private adminService: AdminService
  ) {}

  async validate(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    const isAmatch = await bcrypt.compare(pass, user.salt);
    if (user && isAmatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateAdmin(id: number, pass: string): Promise<any> {
      const admin = await this.adminService.findOne(id);
      const isAmatch = await bcrypt.compare(pass, admin.salt);
        if (admin && admin.password === pass) {
            const { password, ...result } = admin;
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
