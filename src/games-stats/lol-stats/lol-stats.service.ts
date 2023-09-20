import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { riotApiKey } from '../../constants/constants';
import { LolStatsDto, lolRegionGroups } from './dto/lolStatsDto';

@Injectable()
export class LolStatsService {
  async getSummonerInfo({ region, summonerName, matchId }: LolStatsDto) {
    try {
      const headers = {
        'X-Riot-Token': riotApiKey,
      };

      const {
        data: { puuid },
      } = await axios.get(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
        { headers },
      );

      const regionGroup = lolRegionGroups[region];
      const { data: matchHistory } = await axios.get(
        `https://${regionGroup}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`,
        {
          headers,
        },
      );

      const matchIdIndex =
        matchHistory.find((match: string) => match === matchId) ?? 0;
      const requestMatchId = matchHistory[matchIdIndex];

      const { data } = await axios.get(
        `https://${regionGroup}.api.riotgames.com/lol/match/v5/matches/${requestMatchId}/timeline`,
        {
          headers,
        },
      );

      return data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch summoner data`,
        error.response.status,
      );
    }
  }
}
