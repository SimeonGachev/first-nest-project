import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenDto } from './dto/jwtTokenDto';
import { JWtPayloadDto } from './dto/jwtPayloadDto';
import { User } from '../users/interfaces/user.inteface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<JwtTokenDto> {
    const user = await this.usersService.findByUsername(username);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    const payload = {
      sub: user._id,
      username: user.username,
      roles: user.roles,
      tier: user.tier,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async renewToken(user: JWtPayloadDto): Promise<JwtTokenDto> {
    if (!user) throw new UnauthorizedException();

    const payload = {
      sub: user.sub,
      username: user.username,
      roles: user.roles,
      tier: user.tier,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async register({ username, password }): Promise<User> {
    return await this.usersService.addInDb({ username, password });
  }
}
