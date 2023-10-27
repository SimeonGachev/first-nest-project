import { NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import {
  CompetitionDto,
  CompetitionStatus,
  CreateCompetitionDto,
} from './dto/CompetitionDto';
import { ScoresDto } from './dto/scoresDto';
import { competitions } from './data/competitions.model';
import { Model, Types } from 'mongoose';
import { Competition } from './interfaces/competitions.interface';

export class CompetitionsService {
  private readonly competitions = competitions;

  constructor(
    @Inject('COMPETITION_MODEL')
    private readonly competitionModel: Model<Competition>,
  ) {}

  async addInDb(
    createCompetitionDto: CreateCompetitionDto,
    organiser: Types.ObjectId,
  ): Promise<Competition> {
    const newCompetition = {
      ...createCompetitionDto,
      organiser,
      scores: {},
    };
    try {
      const addedCompetition = await this.competitionModel.create(
        newCompetition,
      );

      return addedCompetition;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAllInDb(): Promise<Competition[]> {
    return this.competitionModel.find().exec();
  }

  async closeCompetitionInDb(id: string): Promise<Competition> {
    const competition = await this.competitionModel.findOne({ _id: id }).exec();

    if (!competition) throw new NotFoundException('Competition Not Found');

    if (competition.status === CompetitionStatus.Closed)
      throw new BadRequestException('Competition is already over');

    await this.competitionModel.updateMany(
      { _id: id },
      { $set: { status: CompetitionStatus.Closed, modifiedOn: Date.now() } },
    );
    competition.status = CompetitionStatus.Closed;
    competition.modifiedOn = Date.now();

    return competition;
  }

  async findCompetitionById(id: string): Promise<Competition> {
    try {
      const competition = await this.competitionModel.findById(id);

      return competition;
    } catch (err) {
      throw new NotFoundException('Competition Not Found');
    }
  }

  async joinCompetition(compId: string, userId: string): Promise<Competition> {
    try {
      const competition = await this.competitionModel.findOneAndUpdate(
        { _id: compId },
        { $push: { partitipants: userId } },
      );

      return competition;
    } catch (err) {
      throw new NotFoundException('Competition Not Found');
    }
  }
}
