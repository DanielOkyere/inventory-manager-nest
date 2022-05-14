import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import {WINSTON_MODULE_NEST_PROVIDER} from 'nest-winston';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.enableCors();
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    await app.listen(process.env.PORT || 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
