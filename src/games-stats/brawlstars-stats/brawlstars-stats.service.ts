import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { brawlstarsApiKey } from '../../constants/constants';

@Injectable()
export class BrawlstarsStatsService {
  async getPlayerStats(playerTag: string): Promise<any> {
    const baseUrl = 'https://api.brawlstars.com/v1/players';
    const apiUrl = `${baseUrl}/${playerTag}`;
    const token = `Bearer ${brawlstarsApiKey}`;
    const headers = { Authorization: token };

    try {
      const response = await axios.get(apiUrl, { headers });

      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch statistics`,
        error.response.status,
      );
    }
  }
}
