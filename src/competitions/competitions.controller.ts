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
import { CompetitionsService } from './competitions.service';
import { ScoresDto } from './dto/scoresDto';
import { ZodValidationPipe } from '../pipes/ZodValitationPipe';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Get()
  async getAllCompetitions(): Promise<CreateCompetitionDto[]> {
    return await this.competitionsService.getAllCompetitions();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(competitionSchema.pick({ name: true })))
  async addCompetition(
    @Body() createCompetitionDto: CreateCompetitionDto,
  ): Promise<CreateCompetitionDto> {
    createCompetitionDto.organiser = 'loggedUserPlaceholder';

    return await this.competitionsService.addCompetition(createCompetitionDto);
  }

  @Get(':id')
  async getCompetitionById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateCompetitionDto> {
    return await this.competitionsService.findCompetitionById(id);
  }

  @Put(':id/join')
  async joinCompetition(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string[]> {
    return await this.competitionsService.joinCompetition(
      id,
      'loggedUserPlaceholder',
    );
  }

  @Put(':id/close')
  async closeCompetition(
    @Param('id', ParseIntPipe) id: number,
    @Body() scores: ScoresDto,
  ): Promise<CreateCompetitionDto> {
    return await this.competitionsService.closeCompetition(id, scores);
  }
}
