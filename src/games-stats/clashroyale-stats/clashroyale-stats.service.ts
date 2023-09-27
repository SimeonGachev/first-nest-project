import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { clashroyaleApiKey } from '../../constants/constants';

@Injectable()
export class ClashroyaleStatsService {
  async getPlayerStats(playerTag: string): Promise<any> {
    const baseUrl = 'https://api.clashroyale.com/v1/players';
    const apiUrl = `${baseUrl}/${playerTag}`;
    const token = `Bearer ${clashroyaleApiKey}`;
    const headers = { Authorization: token };

    try {
      const response = await axios.get(apiUrl, { headers });

      return response.data;
    } catch (error) {
      const { reason } = error.response.data;
      throw new HttpException(
        `Failed to fetch clashroyale statistics. Reason: ${reason}`,
        error.response.status,
      );
    }
  }
}
