import { Controller, Get, Post, Put, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCompetitionDto } from './dto/createCompetitionDto';
import { GetAllCompetitionsService } from './services/getAllCompetitions.service';
import { GetCompetitionByIdService } from './services/getCompetitionById.service';
import { AddCompetitionService } from './services/addCompetition.service';
import { JoinCompetitionService } from './services/joinCompetition.service';
import { CloseCompetitionService } from './services/closeCompetition.service';
import { ScoresDto } from './dto/scoresDto';

@Controller("competitions")
export class CompetitionsController {
  constructor(
    private readonly getAllCompetitionsService: GetAllCompetitionsService,
    private readonly getCompetitionByIdService: GetCompetitionByIdService,
    private readonly addCompetitionService: AddCompetitionService,
    private readonly joinCompetitionService: JoinCompetitionService,
    private readonly closeCompetitionService: CloseCompetitionService,
  ) {}

  @Get()
  getAllCompetitions(): any {
    return this.getAllCompetitionsService.getAllCompetitions();
  }

  @Post()
  @UsePipes(ValidationPipe)
  addCompetition(@Body() createCompetitionDto: CreateCompetitionDto): string {
    createCompetitionDto.organiser = "loggedUserPlaceholder"

    return this.addCompetitionService.addCompetition(createCompetitionDto);
  }

  @Get(":id")
  getCompetitionById(@Param("id") id:number): any {
    return this.getCompetitionByIdService.getCompetitionById(id);
  }
  
  @Put(":id/join")
  joinCompetition(@Param("id") id:number): string {
    return this.joinCompetitionService.joinCompetition(id, "loggedUserPlaceholder");
  }
  
  @Put(":id/close")
  closeCompetition(@Param("id") id:number, @Body() scores: ScoresDto): string {
    return this.closeCompetitionService.closeCompetition(id, scores);
  }

}
