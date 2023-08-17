import { CreateStatsDto, statsSchema } from './statsDto';
import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  username: z.string({
    required_error: 'Username must be provided',
    invalid_type_error: 'Userame must be a string',
  }),
  stats: statsSchema,
  referals: z.array(z.string()),
  transactions: z.array(z.any()),
});

export class CreateUserDto {
  id: number;
  username: string;
  stats: CreateStatsDto;
  referals: string[];
  transactions: any[];
}
