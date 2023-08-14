import { Module } from '@nestjs/common';
import { CompetitionsController } from './competitions.controller';
import { GetAllCompetitionsService } from './competitions.services/getAllCompetitions.service';
import { GetCompetitionByIdService } from './competitions.services/getCompetitionById.service';

@Module({
  imports: [],
  controllers: [CompetitionsController],
  providers: [GetAllCompetitionsService, GetCompetitionByIdService],
})
export class CompetitionsModule {}
