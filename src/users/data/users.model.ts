import { CreateUserDto } from '../dto/createUserDto';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateStatsDto } from '../dto/statsDto';

export class UsersModel {
  constructor(private users: any[]) {}

  async getAllUsers(): Promise<CreateUserDto[]> {
    return this.users;
  }

  async findUserById(targetId: number): Promise<CreateUserDto> {
    const user = this.users.find(({ id }: CreateUserDto) => id == targetId);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findUserStatsById(targetId: number): Promise<CreateStatsDto> {
    const user = this.users.find(({ id }: CreateUserDto) => id == targetId);

    if (!user) throw new NotFoundException('User not found');

    return user.stats;
  }

  async findUserReferalsById(targetId: number): Promise<string[]> {
    const user = this.users.find(({ id }: CreateUserDto) => id == targetId);

    if (!user) throw new NotFoundException('User not found');

    return user.referals;
  }

  async findUserTransactionsById(targetId: number): Promise<any[]> {
    const user = this.users.find(({ id }: CreateUserDto) => id == targetId);

    if (!user) throw new NotFoundException('User not found');

    return user.transactions;
  }

  async addUser(username: string): Promise<CreateUserDto> {
    if (!username) throw new BadRequestException('Username must be provided');

    const user = {
      id: this.users.length + 1,
      username: username,
      stats: {
        wins: 0,
        bestScore: 0,
        history: [],
      },
      referals: [],
      transactions: [],
    };

    this.users.push(user);

    return user;
  }
}

export const users = new UsersModel([
  {
    id: 1,
    username: 'username',
    stats: { wins: 0, bestScore: 0, history: [] },
    referals: [],
    transactions: [],
  },
  {
    id: 2,
    username: 'bighot',
    stats: { wins: 0, bestScore: 0, history: [] },
    referals: [],
    transactions: [],
  },
]);
