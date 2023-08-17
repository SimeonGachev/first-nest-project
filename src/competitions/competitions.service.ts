import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCompetitionDto } from './dto/createCompetitionDto';
import { ScoresDto } from './dto/scoresDto';
import { competitions } from './data/competitions.model';

export class CompetitionsService {
  private readonly competitions = competitions;

  async getAllCompetitions(): Promise<CreateCompetitionDto[]> {
    return this.competitions;
  }

  async findCompetitionById(targetId: number): Promise<CreateCompetitionDto> {
    const competition = this.competitions.find(
      ({ id }: CreateCompetitionDto) => id == targetId,
    );

    if (!competition) throw new NotFoundException('Competition Not Found');

    return competition;
  }

  async addCompetition(competitionInfo: any): Promise<CreateCompetitionDto> {
    const { organiser, name }: { organiser: string; name: string } =
      competitionInfo;

    if (!organiser) throw new UnauthorizedException('please log in');

    if (!name)
      throw new BadRequestException('name for the tournament must be provided');

    const newCompetition = {
      id: this.competitions.length + 1,
      organiser: organiser,
      name: name,
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      partitipants: [],
      scores: {},
      status: 'Open',
    };

    this.competitions.push(newCompetition);

    return newCompetition;
  }

  async joinCompetition(targetId: number, username: string): Promise<string[]> {
    const competition = this.competitions.find(
      ({ id }: CreateCompetitionDto) => id == targetId,
    );

    if (!competition) throw new NotFoundException('Competition Not Found');

    const { partitipants } = competition;

    partitipants.push(username);

    return partitipants;
  }

  async closeCompetition(
    targetId: number,
    scores: ScoresDto,
  ): Promise<CreateCompetitionDto> {
    const competition = this.competitions.find(
      ({ id }: CreateCompetitionDto) => id == targetId,
    );

    if (!competition) throw new NotFoundException('Competition Not Found');

    competition.scores = scores;
    competition.status = 'Closed';
    competition.modifiedOn = Date.now();

    return competition;
  }
}
