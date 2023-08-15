import { Injectable } from '@nestjs/common';
import { competitions } from '../data/competitions.model';

@Injectable()
export class AddCompetitionService {
  addCompetition(competitionInfo: any): string {
    const competition = competitions.addCompetition(competitionInfo)
    
    return `Added competition: ${JSON.stringify(competition)}`;
  }
}
