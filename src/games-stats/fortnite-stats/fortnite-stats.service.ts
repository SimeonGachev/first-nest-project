import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { fortniteApiKey } from 'src/constants/constants';

@Injectable()
export class FortniteStatsService {
  async getPlayerStats(userId: string) {
    try {
      const headers = {
        Authorization: fortniteApiKey,
      };

      const response = await axios.get(
        `https://fortnite-api.com/v2/stats/br/v2/${userId}`,
        { headers },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(error.message, error.response.status);
    }
  }
}
