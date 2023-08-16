import { Injectable } from '@nestjs/common';
import { competitions } from '../data/competitions.model';

@Injectable()
export class GetCompetitionByIdService {
  async getCompetitionById( id: number ): Promise<any> {
    return await competitions.findCompetitionById(id)
  }
}
