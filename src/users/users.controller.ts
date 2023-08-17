import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, userSchema } from './dto/createUserDto';
import { CreateStatsDto } from './dto/statsDto';
import { ZodValidationPipe } from 'src/pipes/ZodValitationPipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<CreateUserDto> {
    return await this.usersService.findUserById(id);
  }

  @Get(':id/stats')
  async getStats(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateStatsDto> {
    return await this.usersService.findUserStatsById(id);
  }

  @Get(':id/referals')
  async getReferals(@Param('id', ParseIntPipe) id: number): Promise<string[]> {
    return await this.usersService.findUserReferalsById(id);
  }

  @Get(':id/transactions')
  async getTransactions(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
    return await this.usersService.findUserTransactionsById(id);
  }

  @Get()
  async getAllUsers(): Promise<CreateUserDto[]> {
    return await this.usersService.getAllUsers();
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(userSchema.pick({ username: true })))
  async addUser(
    @Body() { username }: { username: string },
  ): Promise<CreateUserDto> {
    return await this.usersService.addUser(username);
  }
}
