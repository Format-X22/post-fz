import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuestModule } from './quest/quest.module';
import { SettingsModule } from './settings/settings.module';
import { ViewModule } from './view/view.module';
import { ChatModule } from './chat/chat.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        AuthModule,
        QuestModule,
        SettingsModule,
        ViewModule,
        ChatModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        AppService,
    ],
})
export class AppModule {}
