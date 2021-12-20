import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { QuestModule } from './quest/quest.module';
import { ViewModule } from './view/view.module';
import { ChatModule } from './chat/chat.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (cfg: ConfigService) => {
                return {
                    dialect: 'postgres',
                    host: cfg.get('PFZ_DB_HOST', 'localhost'),
                    port: Number(cfg.get('PFZ_DB_PORT', 5432)),
                    username: cfg.get('PFZ_DB_USERNAME', 'postgres'),
                    password: cfg.get('PFZ_DB_PASSWORD', ''),
                    database: cfg.get('PFZ_DB_DATABASE_NAME', 'postfz'),
                    models: [User],
                    autoLoadModels: true,
                    logging: false,
                };
            },
        }),
        AuthModule,
        QuestModule,
        ViewModule,
        ChatModule,
        UserModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
