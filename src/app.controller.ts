import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { LocalAuthGaurd } from "./auth/local-auth.gaurd";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGaurd)
  @Post("auth/login")
  async login(@Request() req) {
    return this.authService.validate(req.user.email, req.user.password);
  }
}
