import { Module } from '@nestjs/common';
import { CsgoStatsService } from './csgo-stats/csgo-stats.service';
import { LolStatsService } from './lol-stats/lol-stats.service';
import { FortniteStatsService } from './fortnite-stats/fortnite-stats.service';
import { GamesStatsController } from './games-stats.controller';
import { Dota2StatsService } from './dota2-stats/dota2-stats.service';
import { BrawlstarsStatsService } from './brawlstars-stats/brawlstars-stats.service';
import { ClashroyaleStatsService } from './clashroyale-stats/clashroyale-stats.service';
import { ClashofclansStatsService } from './clashofclans-stats/clashofclans-stats.service';

@Module({
  providers: [
    CsgoStatsService,
    LolStatsService,
    FortniteStatsService,
    Dota2StatsService,
    BrawlstarsStatsService,
    ClashroyaleStatsService,
    ClashofclansStatsService,
  ],
  exports: [CsgoStatsService, LolStatsService, FortniteStatsService],
  controllers: [GamesStatsController],
})
export class GamesStatsModule {}
