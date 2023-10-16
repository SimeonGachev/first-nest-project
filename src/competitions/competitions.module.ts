import { Module } from '@nestjs/common';
import { CompetitionsController } from './competitions.controller';
import { CompetitionsService } from './competitions.service';
import { competitionsProviders } from './competitions.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CompetitionsController],
  providers: [CompetitionsService, ...competitionsProviders],
})
export class CompetitionsModule {}
