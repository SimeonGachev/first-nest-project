import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export enum CompetitionStatus {
  Open = 'Open',
  Closed = 'Closed',
}

export const CompetitionSchema = z.object({
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
  status: z.enum([CompetitionStatus.Open, CompetitionStatus.Closed]),
});

type Competition = z.infer<typeof CompetitionSchema>;

export class CreateCompetitionDto implements Competition {
  @ApiProperty({
    example: 'Tournament1',
    description: 'name of the tournament',
  })
  name: string;
}

export class CompetitionDto {
  @ApiProperty({ example: 1, description: 'id of the competition' })
  id: number;

  @ApiProperty({
    example: 'SomeUsername',
    description: 'username of the organiser',
  })
  organiser: string;

  @ApiProperty({
    example: 'Tournament1',
    description: 'name of the tournament',
  })
  name: string;

  @ApiProperty({ example: 0, description: 'date of creation' })
  createdOn: number;

  @ApiProperty({ example: 0, description: 'date of modification' })
  modifiedOn: number;

  @ApiProperty({ example: ['user1', 'user2'], description: 'list of users' })
  partitipants: Array<string>;

  @ApiProperty({
    example: { user1: 100, user2: 150 },
    description: 'scorse of users',
  })
  scores: any;

  @ApiProperty({ example: 'closed', description: 'status of the competition' })
  status: CompetitionStatus;
}
