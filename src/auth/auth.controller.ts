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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'signIn' })
  @ApiResponse({ status: HttpStatus.OK, description: 'success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'invalid username or password',
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() { username, password }: { username: string; password: string },
  ) {
    return await this.authService.signIn(username, password);
  }

  @ApiOperation({ summary: 'Gets the profile of the logged user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User is logged in' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not logged in',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
