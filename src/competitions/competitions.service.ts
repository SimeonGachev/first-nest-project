import { NotFoundException, Inject } from '@nestjs/common';
import {
  CompetitionDto,
  CompetitionStatus,
  CreateCompetitionDto,
} from './dto/CompetitionDto';
import { ScoresDto } from './dto/scoresDto';
import { competitions } from './data/competitions.model';
import { Model } from 'mongoose';
import { Competition } from './interfaces/competitions.interface';

export class CompetitionsService {
  private readonly competitions = competitions;

  constructor(
    @Inject('COMPETITION_MODEL')
    private readonly competitionModel: Model<Competition>,
  ) {}

  async addInDb(
    createCompetitionDto: CreateCompetitionDto,
  ): Promise<Competition> {
    const newCompetition = this.competitionModel.create(createCompetitionDto);

    return newCompetition;
  }

  async findAllInDb(): Promise<Competition[]> {
    return this.competitionModel.find().exec();
  }

  async getAllCompetitions(): Promise<CompetitionDto[]> {
    return this.competitions;
  }

  async findCompetitionById(targetId: number): Promise<CompetitionDto> {
    const competition = this.competitions.find(
      ({ id }: CompetitionDto) => id == targetId,
    );

    if (!competition) throw new NotFoundException('Competition Not Found');

    return competition;
  }

  async addCompetition(competitionInfo: any): Promise<CompetitionDto> {
    const { organiser, name }: { organiser: string; name: string } =
      competitionInfo;

    const newCompetition = {
      id: this.competitions.length + 1,
      organiser: organiser,
      name: name,
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      partitipants: [],
      scores: {},
      status: CompetitionStatus.Open,
    };

    this.competitions.push(newCompetition);

    return newCompetition;
  }

  async joinCompetition(
    targetId: number,
    username: string,
  ): Promise<CompetitionDto> {
    const competition = this.competitions.find(
      ({ id }: CompetitionDto) => id == targetId,
    );

    if (!competition) throw new NotFoundException('Competition Not Found');

    const { partitipants } = competition;

    partitipants.push(username);

    return competition;
  }

  async closeCompetition(
    targetId: number,
    scores: ScoresDto,
  ): Promise<CompetitionDto> {
    const competition = this.competitions.find(
      ({ id }: CompetitionDto) => id == targetId,
    );

    if (!competition) throw new NotFoundException('Competition Not Found');

    competition.scores = scores;
    competition.status = CompetitionStatus.Closed;
    competition.modifiedOn = Date.now();

    return competition;
  }
}
