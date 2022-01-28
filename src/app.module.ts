import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdminModule } from "./admin/admin.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection, createConnection } from "typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ExpenditureModule } from "./expenditure/expenditure.module";
import { APP_GUARD } from "@nestjs/core";
import { RolesGaurd } from "./roles.gaurd";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        AdminModule,
        UserModule,
        AuthModule,
        ExpenditureModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: "mongodb",
            url: process.env.DB_URL,
            useNewUrlParser: true,
            logging: true,
            entities: ["dist/**/*.entity{.ts,.js}"],
            synchronize: false,
            useUnifiedTopology: true,
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: RolesGaurd,
        },
    ],
})
export class AppModule {}
