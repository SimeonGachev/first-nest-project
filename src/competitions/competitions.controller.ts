import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { CreateCompetitionDto } from './dto/createCompetitionDto';
import { GetAllCompetitionsService } from './services/getAllCompetitions.service';
import { GetCompetitionByIdService } from './services/getCompetitionById.service';
import { AddCompetitionService } from './services/addCompetition.service';
import { JoinCompetitionService } from './services/joinCompetition.service';
import { CloseCompetitionService } from './services/closeCompetition.service';

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
  getAllCompetitions(): string {
    return this.getAllCompetitionsService.getAllCompetitions();
  }

  @Post()
  addCompetition(@Body() createCompetitionDto: CreateCompetitionDto): string {
    return this.addCompetitionService.addCompetition(createCompetitionDto);
  }

  @Get(":id")
  getCompetitionById(@Param("id") id:string): string {
    return this.getCompetitionByIdService.getCompetitionById(id);
  }
  
  @Put(":id/join")
  joinCompetition(@Param("id") id:string): string {
    return this.joinCompetitionService.joinCompetition(id);
  }
  
  @Put(":id/close")
  closeCompetition(@Param("id") id:string): string {
    return this.closeCompetitionService.closeCompetition(id);
  }

}
