import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(
    @Body() { username, password }: { username: string; password: string },
  ) {
    return await this.authService.signIn(username, password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
