import { ApiProperty } from '@nestjs/swagger';

export class CsgoStatsDto {
  @ApiProperty({
    example: [
      { name: 'total_kills', value: 100 },
      { name: 'total_deaths', value: 50 },
      { name: 'total_time_played', value: 10000 },
      { name: 'total_kills_headshot', value: 20 },
      { name: 'total_damage_done', value: 5000 },
      { name: 'total_contribution_score', value: 10000 },
      { name: 'total_matches_played', value: 50 },
      { name: 'total_shots_fired', value: 1000 },
      { name: 'total_shots_hit', value: 500 },
      { name: 'total_wins', value: 25 },
    ],
  })
  stats: Array<{ name: string; value: number }>;
}
