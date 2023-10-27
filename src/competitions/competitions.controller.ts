import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UsePipes,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import {
  CompetitionDto,
  CreateCompetitionDto,
  CompetitionSchema,
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
} from '@nestjs/swagger';
import { Competition } from './interfaces/competitions.interface';
import { Types } from 'mongoose';

@ApiTags('Competitions')
@ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
@ApiInternalServerErrorResponse({ description: 'Server Error' })
@Controller('competitions')
@ApiBearerAuth()
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Get('')
  @ApiOperation({ summary: 'gets all existing competitions in the database' })
  @ApiOkResponse({ description: 'competitions found', type: [CompetitionDto] })
  @ApiNoContentResponse({ description: 'No Content' })
  @Public()
  async findAll(): Promise<Competition[]> {
    return await this.competitionsService.findAllInDb();
  }

  @Get(':id')
  @Public()
  @ApiOperation({
    summary: 'Get competition by id',
  })
  @ApiOkResponse({ description: 'Competition info', type: CompetitionDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async getCompetitionById(@Param('id') id: string): Promise<Competition> {
    return await this.competitionsService.findCompetitionById(id);
  }

  @Post('create')
  @Roles(Role.User, Role.Admin)
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
  async create(
    @Body() createCompetitionDto: CreateCompetitionDto,
    @Req() req,
  ): Promise<Competition> {
    return await this.competitionsService.addInDb(
      createCompetitionDto,
      req.user.sub,
    );
  }

  @Put(':id/join')
  @Roles(Role.User)
  @ApiOperation({
    summary: 'Joining competition',
    description: 'Roles: user',
  })
  @ApiOkResponse({ description: 'Joinned competition', type: CompetitionDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async joinCompetition(
    @Param('id') id: string,
    @Req() req,
  ): Promise<Competition> {
    return await this.competitionsService.joinCompetition(
      id,
      req.user.username,
    );
  }

  @Put('close/:id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Closes a competition' })
  @ApiOkResponse({
    description: 'competition status changed',
    type: CompetitionDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async closeCompetitionInDb(@Param('id') id: string): Promise<Competition> {
    return await this.competitionsService.closeCompetitionInDb(id);
  }
}
