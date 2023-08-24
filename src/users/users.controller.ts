import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  UsePipes,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, userSchema } from './dto/createUserDto';
import { CreateStatsDto } from './dto/statsDto';
import { ZodValidationPipe } from 'src/pipes/ZodValitationPipe';
import { Public } from 'src/decorators/public.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { JWtPayloadDto } from '../auth/dto/jwtPayloadDto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get('me')
  @ApiOperation({ summary: 'Gets the profile of the logged user' })
  @ApiOkResponse({ description: 'Logged User', type: JWtPayloadDto })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  async getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'Get user', type: CreateUserDto })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<CreateUserDto> {
    return await this.usersService.findUserById(id);
  }

  @Public()
  @Get(':id/stats')
  @ApiOperation({ summary: 'Get user stats' })
  @ApiOkResponse({ description: 'Get user stats', type: CreateStatsDto })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
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
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
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
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  async getTransactions(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
    return await this.usersService.findUserTransactionsById(id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Get all users', type: [CreateUserDto] })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  async getAllUsers(): Promise<CreateUserDto[]> {
    return await this.usersService.getAllUsers();
  }
}
