import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ConfigDto } from 'src/constants/config.schema';

@Injectable()
export class FortniteStatsService {
  private readonly headers = {};

  constructor(configService: ConfigService<ConfigDto>) {
    this.headers['Authorization'] = configService.get('FORTNITE_API_KEY');
  }
  async getPlayerStats(accountId: string) {
    try {
      const response = await axios.get(
        `https://fortnite-api.com/v2/stats/br/v2/${accountId}`,
        { headers: this.headers },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(error.message, error.response.status);
    }
  }
}
