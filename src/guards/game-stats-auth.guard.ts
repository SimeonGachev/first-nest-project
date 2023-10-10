import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { apiKey } from '../constants/constants';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { ConfigDto } from 'src/constants/config.schema';

@Injectable()
export class GamesStatsAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService<ConfigDto>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Missing api key');

    if (token !== this.configService.get('API_KEY'))
      throw new ForbiddenException('Invalid api key');

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
