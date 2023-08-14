import { PipeTransform, BadRequestException } from '@nestjs/common';

export class DisallowStringPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'number') {
      throw new BadRequestException('Invalid parameter. Must be a number.');
    }
    return value;
  }
}