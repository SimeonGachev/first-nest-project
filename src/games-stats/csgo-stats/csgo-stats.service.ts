import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
import { steamApiKey } from 'src/constants/constants';
import { CsgoStatsDto } from './dto/csgoStatsDto';

@Injectable()
export class CsgoStatsService {
  async getPlayerStats(steamId: string): Promise<CsgoStatsDto> {
    const baseUrl =
      'https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/';
    const apiUrl = `${baseUrl}?appid=730&key=${steamApiKey}&steamid=${steamId}`;

    try {
      const response = await axios.get(apiUrl);

      const playerAllStats = response.data.playerstats.stats;

      return {
        stats: playerAllStats.filter(
          ({ name }) =>
            name === 'total_kills' ||
            name === 'total_deaths' ||
            name === 'total_time_played' ||
            name === 'total_kills_headshot' ||
            name === 'total_damage_done' ||
            name === 'total_money_earned' ||
            name === 'total_contribution_score' ||
            name === 'total_matches_played' ||
            name === 'total_shots_fired' ||
            name === 'total_shots_hit' ||
            name === 'total_wins',
        ),
      };
    } catch (error) {
      throw new HttpException(
        `Failed to fetch CS:GO statistics`,
        error.response.status,
      );
    }
  }
}
