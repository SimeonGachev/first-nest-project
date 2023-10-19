import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/createUserDto';
import { CreateStatsDto } from './dto/statsDto';
import { Public } from '../decorators/public.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { JWtPayloadDto } from '../auth/dto/jwtPayloadDto';
import { User } from './interfaces/user.inteface';
import { CreateUserDto } from './dto/createUserDto';

@ApiTags('Users')
@ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
@ApiInternalServerErrorResponse({ description: 'Server Error' })
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get('dbtest')
  @ApiOperation({ summary: 'Lists all Users in the database' })
  @ApiOkResponse({
    description: 'Lists all Users in the database',
    type: Array<User>,
  })
  async findAllInDb(): Promise<Array<User>> {
    return await this.usersService.findAllInDb();
  }

  @Public()
  @Post('dbtest')
  @ApiOperation({ summary: 'Adds User in the database' })
  @ApiOkResponse({ description: 'The added User', type: User })
  async addUserInDb(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.addInDb(createUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get('me')
  @ApiOperation({ summary: 'Gets the profile of the logged user' })
  @ApiOkResponse({ description: 'Logged User', type: JWtPayloadDto })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  async getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'Get user', type: UserDto })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return await this.usersService.findUserById(id);
  }

  @Public()
  @Get(':id/stats')
  @ApiOperation({ summary: 'Get user stats' })
  @ApiOkResponse({ description: 'Get user stats', type: CreateStatsDto })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async getStats(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateStatsDto> {
    return await this.usersService.findUserStatsById(id);
  }

  @Public()
  @Get(':id/referals')
  @ApiOperation({ summary: 'Get user referals' })
  @ApiOkResponse({ description: 'Get user referals' })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async getReferals(@Param('id', ParseIntPipe) id: number): Promise<string[]> {
    return await this.usersService.findUserReferalsById(id);
  }

  @Public()
  @Get(':id/transactions')
  @ApiOperation({ summary: 'Get user transactions' })
  @ApiOkResponse({ description: 'Get user transactions' })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async getTransactions(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
    return await this.usersService.findUserTransactionsById(id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Get all users', type: [UserDto] })
  @ApiNoContentResponse({ description: 'No Content' })
  async getAllUsers(): Promise<UserDto[]> {
    return await this.usersService.getAllUsers();
  }
}
