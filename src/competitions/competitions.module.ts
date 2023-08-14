import { Module } from '@nestjs/common';
import { CompetitionsController } from './competitions.controller';
import { GetAllCompetitionsService } from './services/getAllCompetitions.service';
import { GetCompetitionByIdService } from './services/getCompetitionById.service';
import { AddCompetitionService } from './services/addCompetition.service';
import { JoinCompetitionService } from './services/joinCompetition.service';
import { CloseCompetitionService } from './services/closeCompetition.service';

@Module({
  imports: [],
  controllers: [CompetitionsController],
  providers: [
    GetAllCompetitionsService, 
    GetCompetitionByIdService, 
    AddCompetitionService, 
    JoinCompetitionService, 
    CloseCompetitionService
  ],
})
export class CompetitionsModule {}
