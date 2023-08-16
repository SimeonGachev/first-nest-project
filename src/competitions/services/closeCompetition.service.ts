import { Injectable } from '@nestjs/common';
import { competitions } from '../data/competitions.model';

@Injectable()
export class CloseCompetitionService {
  async closeCompetition(id: number, scores: any): Promise<string> {
    const competition = await competitions.closeCompetition(id, scores)

    return `Closed competition: ${JSON.stringify(competition)}`;
  }
}
