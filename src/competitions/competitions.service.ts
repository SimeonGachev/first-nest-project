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
import { User } from '../users/interfaces/user.inteface';

export class CompetitionsService {
  private readonly competitions = competitions;

  constructor(
    @Inject('COMPETITION_MODEL')
    private readonly competitionModel: Model<Competition>,
    @Inject('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  async onModuleInit() {
    await this.updateUsersOnCompetitionStatusChange();
  }

  async updateUsersOnCompetitionStatusChange() {
    const competitionChangeStream = this.competitionModel.watch();

    competitionChangeStream.on('change', async (change) => {
      if (change.operationType === 'update') {
        const updatedCompetition = change.fullDocument;
        const oldStatus = change.updateDescription.updatedFields.status;

        if (oldStatus && oldStatus !== updatedCompetition.status) {
          const affectedUserIds = updatedCompetition.participants;

          await this.userModel.updateMany(
            { _id: { $in: affectedUserIds } },
            {
              $set: { stats: { wins: 4, bestScore: 100, history: [1, 2, 3] } },
            }, //to be changed
          );
        }
      }
    });

    competitionChangeStream.on('error', (error) => {
      console.error('Error in competition change stream:', error);
    });
  }

  async addInDb(
    createCompetitionDto: CreateCompetitionDto,
  ): Promise<Competition> {
    const newCompetition = {
      ...createCompetitionDto,
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      partitipants: ['6530e087d44dd4cc3b7ae15a'],
      organiser: 'placeholder',
      scores: {},
      status: CompetitionStatus.Open,
    };

    const addedCompetition = this.competitionModel.create(newCompetition);

    return addedCompetition;
  }

  async findAllInDb(): Promise<Competition[]> {
    return this.competitionModel.find().exec();
  }

  async closeCompetitionInDb(targetId: string): Promise<Competition> {
    const competition = await this.competitionModel.findById(targetId).exec();
    console.log(targetId, competition, this.competitionModel);
    // if (!competition) throw new NotFoundException('Competition Not Found');

    competition.status = CompetitionStatus.Closed;
    competition.modifiedOn = Date.now();

    return competition;
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
