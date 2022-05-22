import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdminModule } from "./admin/admin.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ExpenditureModule } from "./expenditure/expenditure.module";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import {utilities as nestWinstonModuleUtilities, WinstonModule } from "nest-winston";
import { RegionModule } from './region/region.module';
import * as winston from "winston";


@Module({
    imports: [
        AdminModule,
        UserModule,
        AuthModule,
        ExpenditureModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
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
        WinstonModule.forRoot({
            transports: [
                new winston.transports.File({
                    filename: "logs/log.log",
                    level: "combined",
                }),
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.ms(),
                        winston.format.timestamp(),
                        nestWinstonModuleUtilities.format.nestLike("Inventory",{prettyPrint: true}))
                })
            ],

        }),
        RegionModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
    ],
})
export class AppModule {}
