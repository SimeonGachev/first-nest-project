import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { lolApiKey } from '../../constants/constants';

@Injectable()
export class LolStatsService {
  async getSummonerInfo(summonerName: string) {
    try {
      const headers = {
        'X-Riot-Token': lolApiKey,
      };

      const response = await axios.get(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
        { headers },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch summoner name`,
        error.response.status,
      );
    }
  }
}
