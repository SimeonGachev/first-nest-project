import { Injectable, HttpException } from '@nestjs/common';
import { BaseApi } from '../../utils/base-api/base-api';
import { InternalAxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { ConfigDto } from '../../constants/config.schema';

@Injectable()
export class BrawlstarsStatsService extends BaseApi {
  constructor(private readonly configService: ConfigService<ConfigDto>) {
    super('https://api.brawlstars.com/v1');
  }

  protected setAuthConfig(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    config.params = {
      ...config.params,
      authorization: `Bearer ${this.configService.get('BRAWLSTARS_API_KEY')}`,
    };

    return config;
  }

  public async getPlayerStats(args): Promise<any> {
    const { playerTag, ...restOfArgs } = args;

    const player = playerTag.replace('#', '%23');

    const endpoint = `/players/${player}`;

    const params = super.createRequestParams(restOfArgs || {});

    try {
      const response = await super.get(endpoint, params);

      return response.data;
    } catch (error) {
      const { reason } = error.response.data;
      throw new HttpException(
        `Failed to fetch brawlstars statistics for user:'${playerTag}'. Reason:'${reason}'`,
        error.response.status,
      );
    }
  }
}
