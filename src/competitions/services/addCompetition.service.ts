import { Injectable } from '@nestjs/common';
import { competitions } from '../data/competitions.model';

@Injectable()
export class AddCompetitionService {
  async addCompetition(competitionInfo: any): Promise<string> {
    const competition = await competitions.addCompetition(competitionInfo)

    return `Added competition: ${JSON.stringify(competition)}`;
  }
}
