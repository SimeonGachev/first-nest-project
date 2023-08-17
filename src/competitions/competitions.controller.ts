import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import {
  CreateCompetitionDto,
  competitionSchema,
} from './dto/createCompetitionDto';
import {
  GetAllCompetitionsService,
  GetCompetitionByIdService,
  AddCompetitionService,
  JoinCompetitionService,
  CloseCompetitionService,
} from './competitions.service';
import { ScoresDto } from './dto/scoresDto';
import { ZodValidationPipe } from '../pipes/ZodValitationPipe';

@Controller('competitions')
export class CompetitionsController {
  constructor(
    private readonly getAllCompetitionsService: GetAllCompetitionsService,
    private readonly getCompetitionByIdService: GetCompetitionByIdService,
    private readonly addCompetitionService: AddCompetitionService,
    private readonly joinCompetitionService: JoinCompetitionService,
    private readonly closeCompetitionService: CloseCompetitionService,
  ) {}

  @Get()
  async getAllCompetitions(): Promise<CreateCompetitionDto[]> {
    return await this.getAllCompetitionsService.getAllCompetitions();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(competitionSchema.pick({ name: true })))
  async addCompetition(
    @Body() createCompetitionDto: CreateCompetitionDto,
  ): Promise<string> {
    createCompetitionDto.organiser = 'loggedUserPlaceholder';

    return await this.addCompetitionService.addCompetition(
      createCompetitionDto,
    );
  }

  @Get(':id')
  async getCompetitionById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateCompetitionDto> {
    return await this.getCompetitionByIdService.getCompetitionById(id);
  }

  @Put(':id/join')
  async joinCompetition(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string> {
    return await this.joinCompetitionService.joinCompetition(
      id,
      'loggedUserPlaceholder',
    );
  }

  @Put(':id/close')
  async closeCompetition(
    @Param('id', ParseIntPipe) id: number,
    @Body() scores: ScoresDto,
  ): Promise<string> {
    return await this.closeCompetitionService.closeCompetition(id, scores);
  }
}
