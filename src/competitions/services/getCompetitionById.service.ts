import { Injectable } from '@nestjs/common';

@Injectable()
export class GetCompetitionByIdService {
  getCompetitionById( id: string ): string {
    return `competition #${id}`;
  }
}
