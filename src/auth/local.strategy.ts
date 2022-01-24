import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authservice: AuthService) {
    super();
  }

  async validate(id: number, password: string): Promise<any> {
    const user = await this.authservice.validate(id, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
