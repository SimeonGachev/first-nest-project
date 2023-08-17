import { PipeTransform, BadRequestException } from '@nestjs/common';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: any) {}

  transform(value: any) {
    try {
      this.schema.parse(value);
    } catch (err) {
      throw new BadRequestException(err.issues[0].message);
    }

    return value;
  }
}
