import { Injectable } from '@nestjs/common';
import { competitions } from '../data/competitions.model';

@Injectable()
export class CloseCompetitionService {
  closeCompetition(id: number, scores: any): string {
    const competition = competitions.closeCompetition(id, scores)

    return `Closed competition: ${JSON.stringify(competition)}`;
  }
}
