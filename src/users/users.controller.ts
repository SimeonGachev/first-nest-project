import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
  Put,
  Body,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, userSchema } from './dto/createUserDto';
import { CreateStatsDto } from './dto/statsDto';
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
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { JWtPayloadDto } from '../auth/dto/jwtPayloadDto';
import { CsgoStatsService } from '../games-stats/csgo-stats/csgo-stats.service';
import { signInDto } from 'src/auth/dto/signInDto';
import { ZodValidationPipe } from 'src/pipes/ZodValitationPipe';
import { CsgoStatsDto } from 'src/games-stats/csgo-stats/dto/csgoStatsDto';

@ApiTags('Users')
@ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
@ApiInternalServerErrorResponse({ description: 'Server Error' })
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly csgoStatsService: CsgoStatsService,
  ) {}

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
  @ApiOkResponse({ description: 'Get user', type: CreateUserDto })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
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
  @Get(':id/csgo')
  @ApiOperation({ summary: 'Get user CS:GO stats' })
  @ApiOkResponse({
    description: 'Get user CS:GO stats',
    type: CsgoStatsDto,
  })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'Forbiden' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async getUserCsgoStats(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CsgoStatsDto> {
    const { steamId } = await this.usersService.findUserById(id);

    return await this.csgoStatsService.getPlayerStats(steamId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Put('steamId')
  @ApiOperation({ summary: "Sets the user's steamID64" })
  @ApiOkResponse({
    description: "Successful update of user's steamID64",
    type: CreateUserDto,
  })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UsePipes(
    new ZodValidationPipe(userSchema.pick({ username: true, password: true })),
  )
  async setUserSteamId(
    @Request() req,
    @Body() credentials: signInDto,
  ): Promise<CreateUserDto> {
    const { username } = req.user;

    const user = await this.usersService.findUserByUsername(username);
    const steamId = await this.csgoStatsService.getPlayerSteamId(credentials);

    return await this.usersService.setUserSteamId(user, steamId);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Get all users', type: [CreateUserDto] })
  @ApiNoContentResponse({ description: 'No Content' })
  async getAllUsers(): Promise<CreateUserDto[]> {
    return await this.usersService.getAllUsers();
  }
}
