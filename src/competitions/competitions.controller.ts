import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UsePipes,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import {
  CompetitionDto,
  CreateCompetitionDto,
  competitionSchema,
} from './dto/CompetitionDto';
import { CompetitionsService } from './competitions.service';
import { ScoresDto } from './dto/scoresDto';
import { ZodValidationPipe } from '../pipes/ZodValitationPipe';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { Public } from 'src/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('competitions')
@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @ApiOperation({ summary: 'gets all existing competitions' })
  @ApiResponse({ status: HttpStatus.OK, description: 'competitions found' })
  @Public()
  @Get()
  async getAllCompetitions(): Promise<CompetitionDto[]> {
    return await this.competitionsService.getAllCompetitions();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new competition',
    description: 'Roles: user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'new competition created',
    type: CompetitionDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  @Roles(Role.User)
  @UsePipes(new ZodValidationPipe(competitionSchema.pick({ name: true })))
  async addCompetition(
    @Body() CompetitionDto: CreateCompetitionDto,
  ): Promise<CompetitionDto> {
    const competition = {
      organiser: 'loggedUserPlaceholder',
      ...CompetitionDto,
    };

    return await this.competitionsService.addCompetition(competition);
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Get competition by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Competition info',
    type: CompetitionDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  async getCompetitionById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompetitionDto> {
    return await this.competitionsService.findCompetitionById(id);
  }

  @Put(':id/join')
  @ApiOperation({
    summary: 'Joining competition',
    description: 'Roles: user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Joinned competition',
    type: CompetitionDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  @Roles(Role.User)
  async joinCompetition(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompetitionDto> {
    return await this.competitionsService.joinCompetition(
      id,
      'loggedUserPlaceholder',
    );
  }

  @Put(':id/close')
  @ApiOperation({
    summary: 'Close a competition',
    description: 'Roles: admin',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'closed a competition',
    type: CompetitionDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  @Roles(Role.Admin)
  async closeCompetition(
    @Param('id', ParseIntPipe) id: number,
    @Body() scores: ScoresDto,
  ): Promise<CompetitionDto> {
    return await this.competitionsService.closeCompetition(id, scores);
  }
}
