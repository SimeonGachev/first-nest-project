import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenDto } from './dto/jwtTokenDto';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { JWtPayloadDto } from './dto/jwtPayloadDto';
import { jwtConstants, saltRounds, lolApiKey } from 'src/constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<JwtTokenDto> {
    const user = await this.usersService.findUserByUsername(username);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    const payload = {
      sub: user.id,
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

  async register({ username, password }): Promise<CreateUserDto> {
    return await this.usersService.addUser({ username, password });
  }
}
