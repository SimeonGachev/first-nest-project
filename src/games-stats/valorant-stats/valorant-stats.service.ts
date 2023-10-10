import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  ValRegion,
  ValorantStatsDto,
  valRegionGroups,
} from './dto/valorantStatsDto';
import { ConfigService } from '@nestjs/config';
import { ConfigDto } from 'src/constants/config.schema';

@Injectable()
export class ValorantStatsService {
  private readonly headers = {};

  constructor(configService: ConfigService<ConfigDto>) {
    this.headers['X-Riot-Token'] = configService.get('RIOT_API_KEY');
  }

  async getPlayer({ gameName, tagLine, region }: ValorantStatsDto) {
    const continent = valRegionGroups[region];

    try {
      const response = await axios.get(
        `https://${continent}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
        { headers: this.headers },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch valorant player user data`,
        error.response.status,
      );
    }
  }

  async getMatchHistory({
    region,
    puuid,
    count,
  }: {
    region: ValRegion;
    puuid: string;
    count?: number;
  }) {
    try {
      const response = await axios.get(
        `https://${region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}/ids?start=0&count=${count}`,
        { headers: this.headers },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch valorant player match history`,
        error.response.status,
      );
    }
  }

  async getMatchDetails({
    matchId,
    region,
  }: {
    region: ValRegion;
    matchId: string;
  }) {
    try {
      const response = await axios.get(
        `https://${region}.api.riotgames.com/val/match/v1/matches/${matchId}`,
        { headers: this.headers },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch valorant player match details`,
        error.response.status,
      );
    }
  }
}
