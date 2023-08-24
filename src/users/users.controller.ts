import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, userSchema } from './dto/createUserDto';
import { CreateStatsDto } from './dto/statsDto';
import { ZodValidationPipe } from 'src/pipes/ZodValitationPipe';
import { Public } from 'src/decorators/public.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Get user by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user',
    type: CreateUserDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<CreateUserDto> {
    return await this.usersService.findUserById(id);
  }

  @Public()
  @Get(':id/stats')
  @ApiOperation({
    summary: 'Get user stats',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user stats',
    type: CreateStatsDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  async getStats(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateStatsDto> {
    return await this.usersService.findUserStatsById(id);
  }

  @Public()
  @Get(':id/referals')
  @ApiOperation({
    summary: 'Get user referals',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user referals',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  async getReferals(@Param('id', ParseIntPipe) id: number): Promise<string[]> {
    return await this.usersService.findUserReferalsById(id);
  }

  @Public()
  @Get(':id/transactions')
  @ApiOperation({
    summary: 'Get user transactions',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user transactions',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  async getTransactions(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
    return await this.usersService.findUserTransactionsById(id);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all users',
    type: [CreateUserDto],
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  async getAllUsers(): Promise<CreateUserDto[]> {
    return await this.usersService.getAllUsers();
  }

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Register new user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Adds new user',
    type: CreateUserDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  @UsePipes(new ZodValidationPipe(userSchema.pick({ username: true })))
  async addUser(
    @Body() { username, password }: { username: string; password: string },
  ): Promise<CreateUserDto> {
    return await this.usersService.addUser({ username, password });
  }
}
