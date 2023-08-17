import { Injectable } from '@nestjs/common';
import { competitions } from './data/competitions.model';
import { CreateCompetitionDto } from './dto/createCompetitionDto';

@Injectable()
export class AddCompetitionService {
  async addCompetition(competitionInfo: any): Promise<string> {
    const competition = await competitions.addCompetition(competitionInfo);

    return `Added competition: ${JSON.stringify(competition)}`;
  }
}

@Injectable()
export class JoinCompetitionService {
  async joinCompetition(id: number, username: string): Promise<string> {
    await competitions.joinCompetition(id, username);

    return 'Joined successfully';
  }
}

@Injectable()
export class GetCompetitionByIdService {
  async getCompetitionById(id: number): Promise<CreateCompetitionDto> {
    return await competitions.findCompetitionById(id);
  }
}

@Injectable()
export class GetAllCompetitionsService {
  async getAllCompetitions(): Promise<CreateCompetitionDto[]> {
    return await competitions.getAllCompetitions();
  }
}

@Injectable()
export class CloseCompetitionService {
  async closeCompetition(id: number, scores: any): Promise<string> {
    const competition = await competitions.closeCompetition(id, scores);

    return `Closed competition: ${JSON.stringify(competition)}`;
  }
}
