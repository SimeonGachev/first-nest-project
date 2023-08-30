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
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiTooManyRequestsResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Competitions')
@ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
@ApiInternalServerErrorResponse({ description: 'Server Error' })
@Controller('competitions')
@ApiBearerAuth()
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @ApiOperation({ summary: 'gets all existing competitions' })
  @ApiOkResponse({ description: 'competitions found', type: [CompetitionDto] })
  @ApiNoContentResponse({ description: 'No Content' })
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
  @ApiCreatedResponse({
    description: 'new competition created',
    type: CompetitionDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Roles(Role.User)
  @UsePipes(new ZodValidationPipe(competitionSchema.pick({ name: true })))
  async addCompetition(
    @Body() createCompetitionDto: CreateCompetitionDto,
  ): Promise<CompetitionDto> {
    const competition = {
      organiser: 'loggedUserPlaceholder',
      ...createCompetitionDto,
    };

    return await this.competitionsService.addCompetition(competition);
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Get competition by id',
  })
  @ApiOkResponse({ description: 'Competition info', type: CompetitionDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
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
  @ApiOkResponse({ description: 'Joinned competition', type: CompetitionDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
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
  @ApiOkResponse({ description: 'closed a competition', type: CompetitionDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBody({
    schema: {
      description: 'scores schema',
      example: { partitipant1: 100, partitipant2: 150 },
    },
  })
  @Roles(Role.Admin)
  async closeCompetition(
    @Param('id', ParseIntPipe) id: number,
    @Body() scores: ScoresDto,
  ): Promise<CompetitionDto> {
    return await this.competitionsService.closeCompetition(id, scores);
  }
}
