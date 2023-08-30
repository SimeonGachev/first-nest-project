import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompetitionsModule } from './competitions/competitions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RateLimitGuard } from './guards/rate-limit.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [CompetitionsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class AppModule {}
