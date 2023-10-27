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
import { Types } from 'mongoose';

@ApiTags('Users')
@ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
@ApiInternalServerErrorResponse({ description: 'Server Error' })
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @Public()
  @ApiOperation({ summary: 'Lists all Users in the database' })
  @ApiOkResponse({
    description: 'Lists all Users in the database',
    type: Array<User>,
  })
  async findAllInDb(): Promise<Array<User>> {
    return await this.usersService.findAllInDb();
  }

  @Get('me')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Gets the profile of the logged user' })
  @ApiOkResponse({ description: 'Logged User', type: UserDto })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  async getProfile(@Request() req): Promise<User> {
    return await this.usersService.findUserById(req.user.sub);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'Get user', type: UserDto })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.findUserById(id);
  }

  @Public()
  @Get(':id/stats')
  @ApiOperation({ summary: 'Get user stats' })
  @ApiOkResponse({ description: 'Get user stats', type: CreateStatsDto })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async getStats(@Param('id') id: string): Promise<CreateStatsDto> {
    return await this.usersService.findUserStatsById(id);
  }

  @Public()
  @Get(':id/referals')
  @ApiOperation({ summary: 'Get user referals' })
  @ApiOkResponse({ description: 'Get user referals' })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async getReferals(@Param('id') id: string): Promise<Types.ObjectId[]> {
    return await this.usersService.findUserReferalsById(id);
  }

  @Public()
  @Get(':id/transactions')
  @ApiOperation({ summary: 'Get user transactions' })
  @ApiOkResponse({ description: 'Get user transactions' })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async getTransactions(@Param('id') id: string): Promise<any[]> {
    return await this.usersService.findUserTransactionsById(id);
  }
}
