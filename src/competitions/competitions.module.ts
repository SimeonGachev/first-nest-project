import { Module } from '@nestjs/common';
import { CompetitionsController } from './competitions.controller';
import { CompetitionsService } from './competitions.service';

@Module({
  imports: [],
  controllers: [CompetitionsController],
  providers: [CompetitionsService],
})
export class CompetitionsModule {}
