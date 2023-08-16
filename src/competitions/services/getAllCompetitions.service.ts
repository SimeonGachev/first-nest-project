import { Injectable } from '@nestjs/common';
import { competitions } from '../data/competitions.model';

@Injectable()
export class GetAllCompetitionsService {
  async getAllCompetitions(): Promise<any[]> {
    return await competitions.getAllCompetitions();
  }
}
