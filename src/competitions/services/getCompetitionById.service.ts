import { Injectable } from '@nestjs/common';
import { competitions } from '../data/competitions.model';

@Injectable()
export class GetCompetitionByIdService {
  getCompetitionById( id: number ) {
    return competitions.findCompetitionById(id)
  }
}
