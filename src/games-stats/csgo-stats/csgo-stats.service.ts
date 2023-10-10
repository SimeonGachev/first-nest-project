import { Injectable, HttpException } from '@nestjs/common';
import { InternalAxiosRequestConfig } from 'axios';
import { CsgoStatsDto } from './dto/csgoStatsDto';
import { BaseApi } from 'src/utils/base-api/base-api';
import { ConfigService } from '@nestjs/config';
import { ConfigDto } from 'src/constants/config.schema';

@Injectable()
export class CsgoStatsService extends BaseApi {
  constructor(private readonly configService: ConfigService<ConfigDto>) {
    super(
      'https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/',
    );
  }

  protected setAuthConfig(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    config.params = {
      ...config.params,
      appid: `730`,
      key: this.configService.get('STEAM_API_KEY'),
    };

    return config;
  }

  public async getPlayerStats(args): Promise<CsgoStatsDto> {
    const { steamId } = args;

    const params = super.createRequestParams(args || {});

    try {
      const response = await super.get('', params);

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
      const { reason } = error.response.data;
      throw new HttpException(
        `Failed to fetch cs-go statistics for user:'${steamId}'. Reason:'${reason}'`,
        error.response.status,
      );
    }
  }
}
