import { z } from 'zod';

export const statsSchema = z.object({
  wins: z.number(),
  bestScore: z.number(),
  history: z.array(z.number()),
});

export class CreateStatsDto {
  wins: number;
  bestScore: number;
  history: number[];
}
