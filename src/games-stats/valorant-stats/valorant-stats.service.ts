import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { riotApiKey } from '../../constants/constants';
import { ValorantStatsDto, valRegionGroups } from './dto/valorantStatsDto';

@Injectable()
export class ValorantStatsService {
  async getMatchDetails({
    gameName,
    tagLine,
    region,
    matchId,
  }: ValorantStatsDto) {
    const headers = { 'X-Riot-Token': riotApiKey };
    const continent = valRegionGroups[region];

    try {
      const {
        data: { puuid },
      } = await axios.get(
        `https://${continent}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
        { headers },
      );

      const { data: matchHistory } = await axios.get(
        `https://${region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}/ids?start=0&count=10`,
        { headers },
      );

      const matchIdIndex =
        matchHistory.find((match: string) => match === matchId) ?? 0;
      const requestMatchId = matchHistory[matchIdIndex];
      const response = await axios.get(
        `https://${region}.api.riotgames.com/val/match/v1/matches/${requestMatchId}`,
        { headers },
      );
    } catch (error) {
      throw new HttpException(
        `Failed to fetch player data`,
        error.response.status,
      );
    }
  }
}
