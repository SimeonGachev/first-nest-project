import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const statsSchema = z.object({
  wins: z.number(),
  bestScore: z.number(),
  history: z.array(z.number()),
});

export class CreateStatsDto {
  @ApiProperty({ example: 0, description: 'wins' })
  wins: number;

  @ApiProperty({ example: 0, description: 'best score' })
  bestScore: number;

  @ApiProperty({ example: [], description: 'list of previous competitions' })
  history: number[];
}
