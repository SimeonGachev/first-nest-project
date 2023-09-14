import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  permissionTiers,
  endpointGroups,
} from '../config/userPermissionsConfig';
import { Redis } from 'ioredis';

// const redis = new Redis();
const redis = new Map();

@Injectable()
export class RateLimitGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const req = http.getRequest();

    const className = context.getClass().name;
    const methodName = context.getHandler().name;

    const currentTime = Math.floor(Date.now() / 1000);
    const endpointName = `${className}-${methodName}`;
    const userKey = req.user?.username ?? req.ip;
    const endpointUserKey = `${endpointName}-${userKey}`;

    const permissionTier = req.user?.tier ?? 'tier1';
    const endpointPermissionTierKey =
      endpointGroups[endpointName]?.[permissionTier] ?? 'default';
    const userRateLimitConfigs =
      permissionTiers[permissionTier][endpointPermissionTierKey];

    for (const { ttl, limit } of userRateLimitConfigs) {
      const key = `${endpointUserKey}-${ttl}-${limit}`;

      await this.checkTooManyRequests(key, currentTime, limit, ttl);
    }

    const endpointTotalKey =
      endpointGroups[endpointName]?.['total'] ?? 'default';
    const endpointRateLimitConfigs =
      permissionTiers['totalPerEndpoint'][endpointTotalKey];

    for (const { ttl, limit } of endpointRateLimitConfigs) {
      const key = `${endpointName}-${ttl}-${limit}`;

      await this.checkTooManyRequests(key, currentTime, limit, ttl);
    }

    const totalRateLimitConfigs = permissionTiers['total']['default'];

    for (const { ttl, limit } of totalRateLimitConfigs) {
      const key = `*-${ttl}-${limit}`;

      await this.checkTooManyRequests(key, currentTime, limit, ttl);
    }

    return true;
  }

  private async checkTooManyRequests(
    key: string,
    currentTime: number,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    const timestamps = (await redis.get(key)) || '';
    const timestampArray = timestamps.split(',');

    const newTimestampArray = timestampArray.filter(
      (timestamp) => currentTime - parseInt(timestamp, 10) <= ttl,
    );

    if (newTimestampArray.length < limit) {
      newTimestampArray.push(currentTime.toString());
      redis.set(key, newTimestampArray.join(','));

      return true;
    } else {
      throw new HttpException(
        'Too Many Requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }
}
