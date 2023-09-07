import { Module } from '@nestjs/common';
import { CsgoStatsService } from './csgo-stats/csgo-stats.service';

@Module({
  providers: [CsgoStatsService],
  exports: [CsgoStatsService],
})
export class GamesStatsModule {}
