import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { lolApiKey } from '../../constants/constants';
import { LolStatsDto, regionGroups } from './dto/lolStatsDto';

@Injectable()
export class LolStatsService {
  async getSummonerInfo({ region, summonerName, matchId }: LolStatsDto) {
    try {
      const headers = {
        'X-Riot-Token': lolApiKey,
      };

      const {
        data: { puuid },
      } = await axios.get(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
        { headers },
      );

      const regionGroup = regionGroups[region];
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
        `Failed to fetch summoner name`,
        error.response.status,
      );
    }
  }
}
