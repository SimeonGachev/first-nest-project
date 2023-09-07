import { ApiProperty } from '@nestjs/swagger';
import { CreateStatsDto, statsSchema } from './statsDto';
import { z } from 'zod';
import { Role } from 'src/enums/role.enum';
import { Tier } from 'src/enums/tier.enum';

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
  roles: z.array(z.enum([Role.User, Role.Admin])),
  tier: z.enum([Tier.Tier1, Tier.Tier2]),
  referals: z.array(z.string()),
  transactions: z.array(z.any()),
});

type User = z.infer<typeof userSchema>;

export class CreateUserDto implements User {
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
  roles: Role[];

  @ApiProperty({
    example: 'tier1',
    description: 'permission tier of the user',
  })
  tier: Tier;

  @ApiProperty({
    example: 'XXXXXXXXXXXXXXXXX',
    description: 'steamID64',
  })
  steamId?: string;

  @ApiProperty({ example: [], description: 'referals' })
  referals: string[];

  @ApiProperty({ example: [], description: 'transactions' })
  transactions: any[];
}
