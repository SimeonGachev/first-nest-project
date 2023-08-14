import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompetitionsModule } from './competitions/competitions.module';

@Module({
  imports: [CompetitionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
