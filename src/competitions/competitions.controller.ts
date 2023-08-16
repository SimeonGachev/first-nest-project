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
  async getAllCompetitions(): Promise<any> {
    return await this.getAllCompetitionsService.getAllCompetitions();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async addCompetition(@Body() createCompetitionDto: CreateCompetitionDto): Promise<string> {
    createCompetitionDto.organiser = "loggedUserPlaceholder"

    return await this.addCompetitionService.addCompetition(createCompetitionDto);
  }

  @Get(":id")
  async getCompetitionById(@Param("id") id:number): Promise<any> {
    return await this.getCompetitionByIdService.getCompetitionById(id);
  }
  
  @Put(":id/join")
  async joinCompetition(@Param("id") id:number): Promise<string> {
    return await this.joinCompetitionService.joinCompetition(id, "loggedUserPlaceholder");
  }
  
  @Put(":id/close")
  async closeCompetition(@Param("id") id:number, @Body() scores: ScoresDto): Promise<string> {
    return await this.closeCompetitionService.closeCompetition(id, scores);
  }

}
