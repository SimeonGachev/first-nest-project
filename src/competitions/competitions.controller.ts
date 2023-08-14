import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { GetAllCompetitionsService } from './competitions.services/getAllCompetitions.service';
import { GetCompetitionByIdService } from './competitions.services/getCompetitionById.service';
import { DisallowStringPipe } from './validation.pipes/disallowStringPipe';

@Controller("competitions")
export class CompetitionsController {
  constructor(
    private readonly getAllCompetitionsService: GetAllCompetitionsService,
    private readonly getCompetitionByIdService: GetCompetitionByIdService,
  ) {}

  @Get()
  getAllCompetitions(): string {
    return this.getAllCompetitionsService.getAllCompetitions();
  }
  
  @Get(":id")
  getCompetitionById(@Param("id") id: number): string {
    return this.getCompetitionByIdService.getCompetitionById(id);
  }
  
}
