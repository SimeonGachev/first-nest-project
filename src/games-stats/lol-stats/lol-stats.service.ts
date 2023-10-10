import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { LolRegion, LolStatsDto, lolRegionGroups } from './dto/lolStatsDto';
import { ConfigService } from '@nestjs/config';
import { ConfigDto } from 'src/constants/config.schema';

@Injectable()
export class LolStatsService {
  private readonly headers = {};

  constructor(configService: ConfigService<ConfigDto>) {
    this.headers['X-Riot-Token'] = configService.get('RIOT_API_KEY');
  }

  async getSummoner({ region, summonerName }: LolStatsDto) {
    try {
      const response = await axios.get(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
        { headers: this.headers },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch summoner:${summonerName} League of Legends user data`,
        error.response.status,
      );
    }
  }

  async getMatchHistory({
    region,
    puuid,
    count,
  }: {
    region: LolRegion;
    puuid: string;
    count?: number;
  }) {
    const regionGroup = lolRegionGroups[region];

    try {
      const response = await axios.get(
        `https://${regionGroup}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`,
        { headers: this.headers },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch league of legends player match history`,
        error.response.status,
      );
    }
  }

  async getMatchDetails({
    matchId,
    region,
  }: {
    region: LolRegion;
    matchId: string;
  }) {
    const regionGroup = lolRegionGroups[region];

    try {
      const response = await axios.get(
        `https://${regionGroup}.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`,
        { headers: this.headers },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch league of legends player match details`,
        error.response.status,
      );
    }
  }

  // async getSummonerInfo({ region, summonerName, matchId }: LolStatsDto) {
  //   try {
  //     const headers = {
  //       'X-Riot-Token': riotApiKey,
  //     };

  //     const {
  //       data: { puuid },
  //     } = await axios.get(
  //       `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
  //       { headers },
  //     );

  //     const regionGroup = lolRegionGroups[region];
  //     const { data: matchHistory } = await axios.get(
  //       `https://${regionGroup}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`,
  //       {
  //         headers,
  //       },
  //     );

  //     const matchIdIndex =
  //       matchHistory.find((match: string) => match === matchId) ?? 0;
  //     const requestMatchId = matchHistory[matchIdIndex];

  //     const { data } = await axios.get(
  //       `https://${regionGroup}.api.riotgames.com/lol/match/v5/matches/${requestMatchId}/timeline`,
  //       {
  //         headers,
  //       },
  //     );

  //     return data;
  //   } catch (error) {
  //     throw new HttpException(
  //       `Failed to fetch summoner:${summonerName} League of Legends data`,
  //       error.response.status,
  //     );
  //   }
  // }
}
