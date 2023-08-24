import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 1, description: 'id of the user' })
  id: number;

  @ApiProperty({ example: 'username', description: 'username' })
  username: string;

  @ApiProperty({ example: 'password', description: 'password' })
  password: string;

  @ApiProperty({
    example: {
      wins: 0,
      bestScore: 0,
      history: [],
    },
    description: 'stats',
  })
  stats: CreateStatsDto;

  @ApiProperty({ example: ['user'], description: 'roles of the user' })
  roles: string[];

  @ApiProperty({ example: [], description: 'referals' })
  referals: string[];

  @ApiProperty({ example: [], description: 'transactions' })
  transactions: any[];
}
