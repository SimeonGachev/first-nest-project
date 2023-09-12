import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { CsgoStatsDto } from './csgo-stats/dto/csgoStatsDto';
import { CsgoStatsService } from './csgo-stats/csgo-stats.service';
import { LolStatsService } from './lol-stats/lol-stats.service';
import { FortniteStatsService } from './fortnite-stats/fortnite-stats.service';
import { Dota2StatsService } from './dota2-stats/dota2-stats.service';
import { BrawlstarsStatsService } from './brawlstars-stats/brawlstars-stats.service';
import { ClashofclansStatsService } from './clashofclans-stats/clashofclans-stats.service';
import { ClashroyaleStatsService } from './clashroyale-stats/clashroyale-stats.service';
import { GamesStatsAuthGuard } from 'src/guards/game-stats-auth.guard';

@Controller('stats')
@ApiTags('stats')
@ApiNoContentResponse({ description: 'No Content' })
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'User is not logged in' })
@ApiForbiddenResponse({ description: 'Forbiden' })
@ApiNotFoundResponse({ description: 'Not Found' })
@ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
@ApiInternalServerErrorResponse({ description: 'Server Error' })
@ApiBearerAuth()
export class GamesStatsController {
  constructor(
    private readonly csgoStatsService: CsgoStatsService,
    private readonly lolStatsService: LolStatsService,
    private readonly fortniteStatsService: FortniteStatsService,
    private readonly dota2StatsService: Dota2StatsService,
    private readonly brawlstarsStatsService: BrawlstarsStatsService,
    private readonly clashofclansStatsService: ClashofclansStatsService,
    private readonly clashroyaleStatsService: ClashroyaleStatsService,
  ) {}

  @Get('cs-go/:steamId')
  @Public()
  @ApiOperation({ summary: 'Get user CS:GO stats' })
  @ApiOkResponse({
    description: 'Get user CS:GO stats',
    type: CsgoStatsDto,
  })
  async getUserCsgoStats(
    @Param('steamId') steamId: string,
  ): Promise<CsgoStatsDto> {
    return await this.csgoStatsService.getPlayerStats(steamId);
  }

  @Get('dota2/:steamId')
  @Public()
  @ApiOperation({ summary: 'Get user CS:GO stats' })
  @ApiOkResponse({
    description: 'Get user CS:GO stats',
    type: CsgoStatsDto,
  })
  async getDota2CsgoStats(@Param('steamId') steamId: string): Promise<any> {
    return await this.dota2StatsService.getPlayerStats(steamId);
  }

  @Get('lol/:summonerName')
  @Public()
  @ApiOperation({ summary: 'Get user LOL stats' })
  @ApiOkResponse({
    description: 'Get user LOL stats',
  })
  async getUserLolStats(
    @Param('summonerName') summonerName: string,
  ): Promise<any> {
    return await this.lolStatsService.getSummonerInfo(summonerName);
  }

  @Get('fortnite/:username')
  @Public()
  @ApiOperation({ summary: 'Get user Fortnite stats' })
  @ApiOkResponse({
    description: 'Get user Fortnite stats',
  })
  async getUserFortniteStats(
    @Param('username') username: string,
  ): Promise<any> {
    return await this.fortniteStatsService.getPlayerStats(username);
  }

  @Get('brawlstars/:playerTag')
  @Public()
  @UseGuards(GamesStatsAuthGuard)
  @ApiOperation({ summary: 'Get player brawlstar stats' })
  @ApiOkResponse({
    description: 'Get player brawlstar stats',
  })
  async getPlayerBrawlstarStats(
    @Param('playerTag') playerTag: string,
  ): Promise<any> {
    return await this.brawlstarsStatsService.getPlayerStats(playerTag);
  }

  @Get('clashroyale/:playerTag')
  @Public()
  @UseGuards(GamesStatsAuthGuard)
  @ApiOperation({ summary: 'Get player clash royale stats' })
  @ApiOkResponse({
    description: 'Get player clash royale stats',
  })
  async getPlayerClashroyaleStats(
    @Param('playerTag') playerTag: string,
  ): Promise<any> {
    return await this.clashroyaleStatsService.getPlayerStats(playerTag);
  }

  @Get('clashofclans/:playerTag')
  @Public()
  @UseGuards(GamesStatsAuthGuard)
  @ApiOperation({ summary: 'Get player clash of clans stats' })
  @ApiOkResponse({
    description: 'Get player clash of clans stats',
  })
  async getPlayerClashofclansStats(
    @Param('playerTag') playerTag: string,
  ): Promise<any> {
    return await this.clashofclansStatsService.getPlayerStats(playerTag);
  }
}
