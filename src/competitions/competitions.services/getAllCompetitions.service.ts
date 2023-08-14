import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllCompetitionsService {
  getAllCompetitions(): string {
    return 'All competitions';
  }
}
