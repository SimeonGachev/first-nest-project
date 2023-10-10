import { HttpException, Injectable } from '@nestjs/common';
import { InternalAxiosRequestConfig } from 'axios';
import { BaseApi } from '../../utils/base-api/base-api';
import { ConfigService } from '@nestjs/config';
import { ConfigDto } from '../../constants/config.schema';

@Injectable()
export class ClashofclansStatsService extends BaseApi {
  constructor(private readonly configService: ConfigService<ConfigDto>) {
    super('https://api.clashofclans.com/v1');
  }

  protected setAuthConfig(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    config.params = {
      ...config.params,
      authorization: `Bearer ${this.configService.get('CLASHOFCLANS_API_KEY')}`,
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
        `Failed to fetch clashofclans statistics for user:'${playerTag}'. Reason:'${reason}'`,
        error.response.status,
      );
    }
  }
}
