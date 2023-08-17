import { ScoresDto } from './scoresDto';
import { z } from 'zod';

export const competitionSchema = z.object({
  id: z.number(),
  organiser: z.string(),
  name: z.string({
    required_error: 'Competition name must be provided',
    invalid_type_error: 'Name must be a string',
  }),
  createdOn: z.number(),
  modifiedOn: z.number(),
  partitipants: z.array(z.string()),
  scores: z.object({}),
  status: z.enum(['Open', 'Closed']),
});

export class CreateCompetitionDto {
  id: number;
  organiser: string;
  name: string;
  createdOn: number;
  modifiedOn: number;
  partitipants: Array<string>;
  scores: any;
  status: string;
}
