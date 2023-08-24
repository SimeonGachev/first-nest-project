import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { Public } from 'src/decorators/public.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { signInDto } from './dto/signInDto';
import { JwtTokenDto } from './dto/jwtTokenDto';

@ApiTags('authentication')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'signIn' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: JwtTokenDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'invalid username or password',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() { username, password }: signInDto,
  ): Promise<JwtTokenDto> {
    return await this.authService.signIn(username, password);
  }

  @ApiOperation({ summary: 'Gets the profile of the logged user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User is logged in' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not logged in',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
