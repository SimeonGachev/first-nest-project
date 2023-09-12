import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { fortniteApiKey } from 'src/constants/constants';

@Injectable()
export class FortniteStatsService {
  async getPlayerStats(username: string) {
    try {
      const headers = {
        'TRN-Api-Key': fortniteApiKey,
      };

      const response = await axios.get(
        `https://api.fortnitetracker.com/v1/profile/pc/${username}`,
        { headers },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(error.message, error.response.status);
    }
  }
}
