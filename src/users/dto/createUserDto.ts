import { CreateStatsDto, statsSchema } from './statsDto';
import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  username: z.string({
    required_error: 'Username must be provided',
    invalid_type_error: 'Userame must be a string',
  }),
  password: z.string({
    required_error: 'Password must be provided',
    invalid_type_error: 'Password must be a string',
  }),
  stats: statsSchema,
  roles: z.array(z.string()),
  referals: z.array(z.string()),
  transactions: z.array(z.any()),
});

export class CreateUserDto {
  id: number;
  username: string;
  password: string;
  stats: CreateStatsDto;
  roles: string[];
  referals: string[];
  transactions: any[];
}
