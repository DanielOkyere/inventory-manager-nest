import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authservice: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authservice.validate(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateAdmin(id: number, password: string): Promise<any> {
    const admin = await this.authservice.validateAdmin(id, password);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
