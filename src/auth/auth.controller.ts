import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { Public } from 'src/decorators/public.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { signInDto } from './dto/signInDto';
import { JwtTokenDto } from './dto/jwtTokenDto';
import { CreateUserDto, userSchema } from 'src/users/dto/createUserDto';
import { ZodValidationPipe } from 'src/pipes/ZodValitationPipe';

@ApiTags('Authentication')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign In' })
  @ApiOkResponse({ description: 'success', type: JwtTokenDto })
  @ApiBadRequestResponse({ description: 'invalid username or password' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() { username, password }: signInDto,
  ): Promise<JwtTokenDto> {
    return await this.authService.signIn(username, password);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiCreatedResponse({ description: 'Adds new user', type: CreateUserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  @UsePipes(
    new ZodValidationPipe(userSchema.pick({ username: true, password: true })),
  )
  async addUser(
    @Body() { username, password }: signInDto,
  ): Promise<CreateUserDto> {
    return await this.authService.register({ username, password });
  }

  @Post('renew-token')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Renew Token' })
  @ApiCreatedResponse({ description: 'Renewed token', type: JwtTokenDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  async renewToken(@Request() req): Promise<JwtTokenDto> {
    const user = req.user;

    return await this.authService.renewToken(user);
  }
}
