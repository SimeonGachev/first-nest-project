import * as bcrypt from 'bcrypt';
import { CreateUserDto, UserDto } from './dto/createUserDto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Inject, Injectable } from '@nestjs/common/decorators/core';
import { CreateStatsDto } from './dto/statsDto';
import { users } from './data/users.model';
import { saltRounds } from '../constants/constants';
import { Role } from '../enums/role.enum';
import { Tier } from '../enums/tier.enum';
import { User } from './interfaces/user.inteface';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  private readonly users = users;

  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async addInDb({ password, ...createUserDto }: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      password: hashedPassword,
      ...createUserDto,
    };

    const addedUser = this.userModel.create(newUser);

    return addedUser;
  }

  async findAllInDb(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async getAllUsers(): Promise<UserDto[]> {
    return this.users;
  }

  // async findUserByUsername(targetUsername: string): Promise<UserDto> {
  //   const user = this.users.find(
  //     ({ username }: UserDto) => username === targetUsername,
  //   );

  //   if (!user) throw new NotFoundException('User not found');

  //   return user;
  // }

  async findUserById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);

      return user;
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }

  async findUserStatsById(id: string): Promise<CreateStatsDto> {
    try {
      const user = await this.userModel.findById(id);

      return user.stats;
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }

  async findUserReferalsById(id: string): Promise<Types.ObjectId[]> {
    try {
      const user = await this.userModel.findById(id);

      return user.referals;
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }

  async findUserTransactionsById(id: string): Promise<any[]> {
    try {
      const user = await this.userModel.findById(id);

      return user.transactions;
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }

  async setUserSteamId(user: UserDto, steamId: string): Promise<UserDto> {
    user.steamId = steamId;

    return user;
  }

  async addUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<UserDto> {
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
