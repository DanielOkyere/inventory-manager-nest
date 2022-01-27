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
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        AdminModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.PG_URL || "localhost",
            port: +process.env.PG_PORT ||5433,
            username: process.env.PG_USER || "",
            password: process.env.PG_PASSWORD || "",
            database: process.env.PG_DB || "inventory_manager",
            synchronize: true,
            logging: false,
            entities: ["dist/**/*.entity{.ts,.js}"],
            migrations: ["src/migration/**/*.ts"],
            subscribers: ["src/subscriber/**/*.ts"],
        }),
        UserModule,
        AuthModule,
        ExpenditureModule,
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
export class AppModule {
    constructor(private connection: Connection) {}
}
