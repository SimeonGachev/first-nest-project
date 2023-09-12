import { Module } from '@nestjs/common';
import { CsgoStatsService } from './csgo-stats/csgo-stats.service';
import { LolStatsService } from './lol-stats/lol-stats.service';
import { FortniteStatsService } from './fortnite-stats/fortnite-stats.service';
import { GamesStatsController } from './games-stats.controller';
import { Dota2StatsService } from './dota2-stats/dota2-stats.service';

@Module({
  providers: [CsgoStatsService, LolStatsService, FortniteStatsService, Dota2StatsService],
  exports: [CsgoStatsService, LolStatsService, FortniteStatsService],
  controllers: [GamesStatsController],
})
export class GamesStatsModule {}
