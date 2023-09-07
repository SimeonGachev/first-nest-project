import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUserDto';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common/decorators/core';
import { CreateStatsDto } from './dto/statsDto';
import { users } from './data/users.model';
import { saltRounds } from 'src/constants/constants';
import { Role } from 'src/enums/role.enum';
import { Tier } from 'src/enums/tier.enum';

@Injectable()
export class UsersService {
  private readonly users = users;

  async getAllUsers(): Promise<CreateUserDto[]> {
    return this.users;
  }

  async findUserByUsername(targetUsername: string): Promise<CreateUserDto> {
    const user = this.users.find(
      ({ username }: CreateUserDto) => username === targetUsername,
    );

    if (!user) throw new NotFoundException('User not found');

    return user;
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

  async setUserSteamId(
    user: CreateUserDto,
    steamId: string,
  ): Promise<CreateUserDto> {
    user.steamId = steamId;

    return user;
  }

  async addUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<CreateUserDto> {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = {
      id: this.users.length + 1,
      username: username,
      password: hashedPassword,
      stats: {
        wins: 0,
        bestScore: 0,
        history: [],
      },
      roles: [Role.User],
      tier: Tier.Tier1,
      referals: [],
      transactions: [],
    };

    this.users.push(user);

    return user;
  }
}
users.forEach((user) => {
  user.password = bcrypt.hashSync(user.password, saltRounds);
});
