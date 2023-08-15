import { Injectable } from '@nestjs/common';
import { competitions } from '../data/competitions.model';

@Injectable()
export class GetAllCompetitionsService {
  getAllCompetitions(): Array<any> {
    return competitions.getAllCompetitions();
  }
}
