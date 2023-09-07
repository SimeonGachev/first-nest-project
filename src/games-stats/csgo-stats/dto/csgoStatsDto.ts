import { ApiProperty } from '@nestjs/swagger';

export class CsgoStatsDto {
  @ApiProperty({
    example: [
      { name: 'total_kills', value: 100 },
      { name: 'total_deaths', value: 50 },
      { name: 'total_time_played', value: 10000 },
      { name: 'total_wins', value: 25 },
    ],
  })
  stats: Array<{ name: string; value: number }>;
}
