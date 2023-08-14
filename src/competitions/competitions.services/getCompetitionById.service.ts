import { Injectable } from '@nestjs/common';

@Injectable()
export class GetCompetitionByIdService {
  getCompetitionById( id: number ): string {
    return `competition #${id}`;
  }
}
