import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { clashroyaleApiKey } from '../../constants/constants';

@Injectable()
export class ClashroyaleStatsService {
  async getPlayerStats(playerTag: string): Promise<any> {
    const user = playerTag.replace('#', '%23');
    const baseUrl = 'https://api.clashroyale.com/v1/players';
    const apiUrl = `${baseUrl}/${user}`;
    const token = `Bearer ${clashroyaleApiKey}`;
    const headers = { Authorization: token };

    try {
      const response = await axios.get(apiUrl, { headers });

      return response.data;
    } catch (error) {
      const { reason } = error.response.data;
      throw new HttpException(
        `Failed to fetch clashroyale statistics for user:'${playerTag}'. Reason:'${reason}'`,
        error.response.status,
      );
    }
  }
}
