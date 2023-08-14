import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompetitionsModule } from './competitions/competitions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CompetitionsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
