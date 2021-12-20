import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { ConfigService } from '@nestjs/config';

const DEFAULT_PORT = 3003;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = Number(app.get(ConfigService).get('PFZ_PORT', DEFAULT_PORT));

    app.use(cookieParser());
    app.use(csurf());
    app.use(helmet());

    await app.listen(port);
}
bootstrap();
