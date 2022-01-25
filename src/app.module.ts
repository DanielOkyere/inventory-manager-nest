import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdminModule } from "./admin/admin.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ExpenditureModule } from "./expenditure/expenditure.module";
import { APP_GUARD } from "@nestjs/core";
import { RolesGaurd } from "./roles.gaurd";

@Module({
  imports: [
    AdminModule,
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    ExpenditureModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGaurd
    }
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
