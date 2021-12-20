import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const DEFAULT_PORT = 3003;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = Number(app.get(ConfigService).get('PFZ_PORT', DEFAULT_PORT));

    app.use(helmet());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    const swaggerConfig = new DocumentBuilder().setTitle('App api').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api-docs', app, document);

    await app.listen(port);
}
bootstrap();
