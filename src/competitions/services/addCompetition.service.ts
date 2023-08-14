import { Injectable } from '@nestjs/common';

@Injectable()
export class AddCompetitionService {
  addCompetition(competitionInfo: any): string {
    return `Added competition: ${competitionInfo}`;
  }
}
