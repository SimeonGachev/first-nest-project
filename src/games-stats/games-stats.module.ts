import { Module } from '@nestjs/common';
import { CsgoStatsService } from './csgo-stats/csgo-stats.service';
import { LolStatsService } from './lol-stats/lol-stats.service';

@Module({
  providers: [CsgoStatsService, LolStatsService],
  exports: [CsgoStatsService, LolStatsService],
})
export class GamesStatsModule {}
