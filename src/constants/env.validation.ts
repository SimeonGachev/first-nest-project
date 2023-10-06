import { BadRequestException } from '@nestjs/common';
import { configSchema } from './config.schema';

export async function validate(config: Record<string, unknown>) {
  try {
    configSchema.parse(config);
  } catch (err) {
    throw new BadRequestException(err.issues[0].message);
  }

  return config;
}
