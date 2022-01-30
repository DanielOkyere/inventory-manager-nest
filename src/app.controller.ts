import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
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


  @Post("/user/auth/login")
  async login(@Request() req) {
    const user = await this.authService.validate(req.body.email, req.body.password);
    return this.authService.login(user);
  }
  @Post("/admin/auth/login")
  async loginAdmin( @Request() req) {
    const admin = await this.authService.validateAdmin(req.body.email, req.body.password);
    return this.authService.login(admin);
  }
}
