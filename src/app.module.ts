import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompetitionsModule } from './competitions/competitions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RateLimitGuard } from './guards/rate-limit.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ConfigModule } from '@nestjs/config';
import { validate } from './constants/env.validation';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    CompetitionsModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class AppModule {}
