import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { clashofclansApiKey } from '../../constants/constants';

@Injectable()
export class ClashofclansStatsService {
  async getPlayerStats(playerTag: string): Promise<any> {
    const user = playerTag.replace('#', '%23');
    const baseUrl = 'https://api.clashofclans.com/v1/players';
    const apiUrl = `${baseUrl}/${user}`;
    const token = `Bearer ${clashofclansApiKey}`;
    const headers = { Authorization: token };

    try {
      const response = await axios.get(apiUrl, { headers });

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
