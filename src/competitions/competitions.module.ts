import { Module } from '@nestjs/common';
import { CompetitionsController } from './competitions.controller';
import {
  GetAllCompetitionsService,
  GetCompetitionByIdService,
  AddCompetitionService,
  JoinCompetitionService,
  CloseCompetitionService,
} from './competitions.service';

@Module({
  imports: [],
  controllers: [CompetitionsController],
  providers: [
    GetAllCompetitionsService,
    GetCompetitionByIdService,
    AddCompetitionService,
    JoinCompetitionService,
    CloseCompetitionService,
  ],
})
export class CompetitionsModule {}
