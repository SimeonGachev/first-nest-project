import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import {
  GetUserByIdService,
  GetAllUsersService,
  GetUserReferalsByIdService,
  GetUserTransactionsByIdService,
  GetUserStatsByIdService,
  AddUserService,
} from './users.service';
import { CreateUserDto, userSchema } from './dto/createUserDto';
import { CreateStatsDto } from './dto/statsDto';
import { ZodValidationPipe } from 'src/pipes/ZodValitationPipe';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserById: GetUserByIdService,
    private readonly getUserStats: GetUserStatsByIdService,
    private readonly getUserReferals: GetUserReferalsByIdService,
    private readonly getUserTransactions: GetUserTransactionsByIdService,
    private readonly getAllUsersService: GetAllUsersService,
    private readonly addUserService: AddUserService,
  ) {}

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<CreateUserDto> {
    return await this.getUserById.getUserById(id);
  }

  @Get(':id/stats')
  async getStats(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateStatsDto> {
    return await this.getUserStats.getUserStatsById(id);
  }

  @Get(':id/referals')
  async getReferals(@Param('id', ParseIntPipe) id: number): Promise<string[]> {
    return await this.getUserReferals.getUserReferalsById(id);
  }

  @Get(':id/transactions')
  async getTransactions(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
    return await this.getUserTransactions.getUserTransactionsById(id);
  }

  @Get()
  async getAllUsers(): Promise<CreateUserDto[]> {
    return await this.getAllUsersService.getAllUsers();
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(userSchema.pick({ username: true })))
  async addUser(
    @Body() { username }: { username: string },
  ): Promise<CreateUserDto> {
    return await this.addUserService.add(username);
  }
}
