import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { brawlstarsApiKey } from '../../constants/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BrawlstarsStatsService {
  private readonly BASE_URL = 'https://api.brawlstars.com/v1/players';

  constructor(private readonly configService: ConfigService) {}

  async getPlayerStats(playerTag: string): Promise<any> {
    const user = playerTag.replace('#', '%23');
    const apiUrl = `${this.BASE_URL}/${user}`;
    const token = `Bearer ${brawlstarsApiKey}`;
    const headers = { Authorization: token };

    try {
      const response = await axios.get(apiUrl, { headers });

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
