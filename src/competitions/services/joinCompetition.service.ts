import { Injectable } from '@nestjs/common';

@Injectable()
export class JoinCompetitionService {
  joinCompetition(id: string): string {
    return `Joined competition: ${id}`;
  }
}
