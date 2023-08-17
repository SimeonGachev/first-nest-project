import { Injectable } from '@nestjs/common/decorators/core';
import { users } from './data/users.model';
import { CreateUserDto } from './dto/createUserDto';
import { CreateStatsDto } from './dto/statsDto';

@Injectable()
export class AddUserService {
  async add(username: string): Promise<CreateUserDto> {
    return await users.addUser(username);
  }
}

@Injectable()
export class GetAllUsersService {
  async getAllUsers(): Promise<CreateUserDto[]> {
    return await users.getAllUsers();
  }
}

@Injectable()
export class GetUserByIdService {
  async getUserById(id: number): Promise<CreateUserDto> {
    return await users.findUserById(id);
  }
}

@Injectable()
export class GetUserStatsByIdService {
  async getUserStatsById(id: number): Promise<CreateStatsDto> {
    return await users.findUserStatsById(id);
  }
}

@Injectable()
export class GetUserReferalsByIdService {
  async getUserReferalsById(id: number): Promise<string[]> {
    return await users.findUserReferalsById(id);
  }
}

@Injectable()
export class GetUserTransactionsByIdService {
  async getUserTransactionsById(id: number): Promise<any[]> {
    return await users.findUserTransactionsById(id);
  }
}
