import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

const map = new Map();

@Injectable()
export class RateLimitGuard implements CanActivate {
  private maxRequestsPerEndpoindPerUser = 10;
  private maxRequestsPerEndpoind = 50;
  private maxRequests = 500;
  private timeWindow = 60;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const req = http.getRequest();

    const className = context.getClass().name;
    const methodName = context.getHandler().name;

    const currentTime = Math.floor(Date.now() / 1000);
    const endpointKey = `${className}-${methodName}`;
    const userKey = `${endpointKey}-ip:${req.ip}`;

    await this.checkTooManyRequests(
      '*',
      currentTime,
      this.maxRequests,
      this.timeWindow,
    );
    await this.checkTooManyRequests(
      endpointKey,
      currentTime,
      this.maxRequestsPerEndpoind,
      this.timeWindow,
    );
    await this.checkTooManyRequests(
      userKey,
      currentTime,
      this.maxRequestsPerEndpoindPerUser,
      this.timeWindow,
    );

    return true;
  }

  private async checkTooManyRequests(
    key: string,
    currentTime: number,
    maxRequests: number,
    timeWindow: number,
  ): Promise<boolean> {
    const timestamps = map.get(key) || '';
    const timestampArray = timestamps.split(',');

    const newTimestampArray = timestampArray.filter(
      (ts) => currentTime - parseInt(ts, 10) <= timeWindow,
    );

    if (newTimestampArray.length < maxRequests) {
      newTimestampArray.push(currentTime.toString());
      map.set(key, newTimestampArray.join(','));

      return true;
    } else {
      throw new HttpException(
        'Too Many Requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }
}
