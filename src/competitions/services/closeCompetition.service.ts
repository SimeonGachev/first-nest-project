import { Injectable } from '@nestjs/common';

@Injectable()
export class CloseCompetitionService {
  closeCompetition(id: string): string {
    return `Closed competition: ${id}`;
  }
}
