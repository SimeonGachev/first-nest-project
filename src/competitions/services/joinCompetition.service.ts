import { Injectable } from '@nestjs/common';
import { competitions } from '../data/competitions.model';

@Injectable()
export class JoinCompetitionService {
  joinCompetition( id: number, username: string ) {
    competitions.joinCompetition( id, username )

    return "Joined successfully"
  }
}
