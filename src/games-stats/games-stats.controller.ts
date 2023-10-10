import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseEnumPipe,
  BadRequestException,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
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
import { LolRegion } from './lol-stats/dto/lolStatsDto';
import { ValRegion } from './valorant-stats/dto/valorantStatsDto';
import { ValorantStatsService } from './valorant-stats/valorant-stats.service';

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
    private readonly valorantStatsService: ValorantStatsService,
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
    return await this.csgoStatsService.getPlayerStats({ steamId });
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

  @Get('lol/player')
  @Public()
  @ApiOperation({ summary: 'Get user League of Legends stats' })
  @ApiOkResponse({
    description: 'Get user League of Legends stats',
  })
  @ApiQuery({ name: 'region', enum: LolRegion })
  async getLolUserStats(
    @Query(
      'region',
      new ParseEnumPipe(LolRegion, {
        exceptionFactory: () => {
          throw new BadRequestException('Invalid League of Legends Region');
        },
      }),
    )
    region: LolRegion,
    @Query('summonerName') summonerName: string,
  ): Promise<any> {
    return await this.lolStatsService.getSummoner({
      region,
      summonerName,
    });
  }

  @Get('lol/match/history')
  @Public()
  @ApiOperation({ summary: 'Get user League of Legends match history' })
  @ApiOkResponse({
    description: 'Get user League of Legends match history',
  })
  @ApiQuery({
    name: 'count',
    required: false,
    description:
      'The number of the latest matches, that need to be returned. Default: 10',
  })
  @ApiQuery({ name: 'region', enum: LolRegion })
  async getLolSummonerMatchHistory(
    @Query(
      'region',
      new ParseEnumPipe(LolRegion, {
        exceptionFactory: () => {
          throw new BadRequestException('Invalid League of Legends Region');
        },
      }),
    )
    region: LolRegion,
    @Query('puuid') puuid: string,
    @Query('count') count: number = 10,
  ): Promise<any> {
    return await this.lolStatsService.getMatchHistory({
      region,
      puuid,
      count,
    });
  }

  @Get('lol/match/details')
  @Public()
  @ApiOperation({ summary: 'Get user League of Legends match details' })
  @ApiOkResponse({
    description: 'Get user League of Legends match details',
  })
  @ApiQuery({ name: 'region', enum: LolRegion })
  async getLolMatchDetails(
    @Query(
      'region',
      new ParseEnumPipe(LolRegion, {
        exceptionFactory: () => {
          throw new BadRequestException('Invalid League of Legends Region');
        },
      }),
    )
    region: LolRegion,
    @Query('matchId') matchId: string,
  ): Promise<any> {
    return await this.lolStatsService.getMatchDetails({
      region,
      matchId,
    });
  }

  @Get('val/player')
  @Public()
  @ApiOperation({ summary: 'Get user Valorant stats' })
  @ApiOkResponse({
    description: 'Get user Valorant stats',
  })
  @ApiQuery({ name: 'region', enum: ValRegion })
  async getUserValStats(
    @Query(
      'region',
      new ParseEnumPipe(ValRegion, {
        exceptionFactory: () => {
          throw new BadRequestException('Invalid Valorant Region');
        },
      }),
    )
    region: ValRegion,
    @Query('gameName') gameName: string,
    @Query('tagLine') tagLine: string,
  ): Promise<any> {
    return await this.valorantStatsService.getPlayer({
      region,
      gameName,
      tagLine,
    });
  }

  @Get('val/match/history')
  @Public()
  @ApiOperation({ summary: 'Get user Valorant match history' })
  @ApiOkResponse({
    description: 'Get user Valorant match history',
  })
  @ApiQuery({
    name: 'count',
    required: false,
    description:
      'The number of the latest matches, that need to be returned. Default: 10',
  })
  @ApiQuery({ name: 'region', enum: ValRegion })
  async getValMatchHistory(
    @Query(
      'region',
      new ParseEnumPipe(ValRegion, {
        exceptionFactory: () => {
          throw new BadRequestException('Invalid Region');
        },
      }),
    )
    region: ValRegion,
    @Query('puuid') puuid: string,
    @Query('count') count: number = 10,
  ): Promise<any> {
    return await this.valorantStatsService.getMatchHistory({
      region,
      puuid,
      count,
    });
  }

  @Get('val/match/details')
  @Public()
  @ApiOperation({ summary: 'Get user Valorant match details' })
  @ApiOkResponse({
    description: 'Get user Valorant match details',
  })
  @ApiQuery({ name: 'region', enum: ValRegion })
  async getValMatchDetails(
    @Query(
      'region',
      new ParseEnumPipe(ValRegion, {
        exceptionFactory: () => {
          throw new BadRequestException('Invalid Region');
        },
      }),
    )
    region: ValRegion,
    @Query('matchId') matchId: string,
  ): Promise<any> {
    return await this.valorantStatsService.getMatchDetails({
      region,
      matchId,
    });
  }

  @Get('fortnite/:accountId')
  @Public()
  @ApiOperation({ summary: 'Get user Fortnite stats' })
  @ApiOkResponse({
    description: 'Get user Fortnite stats',
  })
  async getUserFortniteStats(
    @Param('accountId') accountId: string,
  ): Promise<any> {
    return await this.fortniteStatsService.getPlayerStats(accountId);
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
    return await this.brawlstarsStatsService.getPlayerStats({ playerTag });
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
