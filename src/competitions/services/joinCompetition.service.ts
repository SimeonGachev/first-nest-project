import { Injectable } from '@nestjs/common';
import { competitions } from '../data/competitions.model';

@Injectable()
export class JoinCompetitionService {
  async joinCompetition( id: number, username: string ): Promise<string> {
    await competitions.joinCompetition( id, username )

    return "Joined successfully"
  }
}
