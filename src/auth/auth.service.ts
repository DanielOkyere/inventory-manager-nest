import { Injectable, UnauthorizedException } from "@nestjs/common";
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
    const isAmatch = await bcrypt.compare(pass, user.password);
    if (user && isAmatch) {
      const { password,salt, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async validateAdmin(email: string, pass: string): Promise<any> {
      const admin = await this.adminService.findAdminByEmail(email);
      const isAmatch = await bcrypt.compare(pass, admin.password);
        if (admin && isAmatch) {
            const { password, salt, ...result } = admin;
            return result;
        }
        throw new UnauthorizedException();
    }

  async login(user: any) {
    const payload = { id: user.id, email: user.email, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
      ...payload
    };
  }
}
