import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { steamApiKey } from '../../constants/constants';

@Injectable()
export class Dota2StatsService {
  async getPlayerStats(steamId: string): Promise<any> {
    const baseUrl =
      'https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/';
    const apiUrl = `${baseUrl}?appid=570&key=${steamApiKey}&steamid=${steamId}`;

    try {
      const response = await axios.get(apiUrl);

      const playerAllStats = response.data.playerstats.stats;

      if (!playerAllStats) throw new BadRequestException('no game stats');

      return {
        stats: playerAllStats.filter(
          ({ name }) =>
            name === 'total_kills' ||
            name === 'total_deaths' ||
            name === 'total_time_played' ||
            name === 'total_wins',
        ),
      };
    } catch (error) {
      throw new HttpException(
        `Failed to fetch DOTA2 statistics`,
        error.response.status,
      );
    }
  }
}
